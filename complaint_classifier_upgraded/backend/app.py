from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/classifier.pkl","rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl","rb"))

contacts = {
    "Food and Canteen Issues":{
        "email":"principal@lbsitw.ac.in",
        "phone":" +91 471 2353831 , +91 471 2353720",
        "image":"images/canteen.jpg"
    },
    "Career opportunities":{
        "email":"cgpu@lbsitw.ac.in",
        "phone":"+91 471 2349262.",
        "image":"images/career1.jpg"
    },
    "Health and Well-being Support":{
        "email":"principal@lbsitw.ac.in",
        "phone":" +91 471 2353831",
        "image":"images/health.jpg"
    },
    "Student Affairs":{
        "email":"principal@lbsitw.ac.in",
        "phone":" +91 471 2353831 , +91 471 2353720.",
        "image":"images/academic.jpg"
    },
    "Academic Support and Resources":{
        "email":"principal@lbsitw.ac.in",
        "phone":" +91 471 2353831 , +91 471 2353720.",
        "image":"images/academic.jpg"
    },
    "Hostel":{
        "email":"hostel.lbsitw@gmail.com , hostellbsitw@lbsitw.ac.in",
        "phone":" 9745527664 , 9048546474",
        "image":"images/hostel1.jpg"
    },
    "Athletics and sports":{
        "email":"sports@college.edu",
        "phone":"9876543280",
        "image":"images/sports.jpg"
    }
}
def init_db():
    conn = sqlite3.connect("complaints.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS complaints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        category TEXT,
        timestamp TEXT
    )
    """)

    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return "Backend is running successfully"

@app.route("/history", methods=["GET"])
def history():
    conn = sqlite3.connect("complaints.db")
    cursor = conn.cursor()

    cursor.execute("SELECT category, COUNT(*) FROM complaints GROUP BY category")
    counts = cursor.fetchall()

    cursor.execute("SELECT text, category, timestamp FROM complaints ORDER BY id DESC LIMIT 5")
    recent = cursor.fetchall()

    conn.close()

    return jsonify({
        "counts": counts,
        "recent": recent
    })

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json["complaint"].lower()

    # ✅ STEP 1: Direct category detection
    if "hostel" in text:
        result = "Hostel"
    elif "canteen" in text:
        result = "Food and Canteen Issues"
    elif "career" in text or "placement" in text:
        result = "Career opportunities"
    elif "health" in text or "sick" in text:
        result = "Health and Well-being Support"
    elif "academic" in text or "study" in text:
        result = "Academic Support and Resources"
    elif "fees" in text or "affairs" in text:
        result = "Student Affairs"
    elif "sports" in text:
        result = "Athletics and sports"

    # ✅ STEP 2: Keyword logic
    elif "room" in text:
        result = "Hostel"
    elif "food" in text or "eat" in text:
        result = "Food and Canteen Issues"

    # 🤖 STEP 3: ML fallback (your original code)
    else:
        vect = vectorizer.transform([text])
        result = model.predict(vect)[0]

    # ✅ KEEP THIS SAME
    data = contacts.get(result, {
        "email":"Not Available",
        "phone":"Not Available",
        "image":""
    })

    # =========================
# STORE IN DATABASE
# =========================
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect("complaints.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO complaints (text, category, timestamp) VALUES (?, ?, ?)",
        (text, result, time)
        )

    conn.commit()
    conn.close()

    return jsonify({
        "category": result,
        "email": data["email"],
        "phone": data["phone"],
        "image": data["image"]
    })

if __name__ == "__main__":
    app.run(debug=True)