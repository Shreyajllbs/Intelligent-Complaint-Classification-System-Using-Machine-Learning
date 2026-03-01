from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/classifier.pkl","rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl","rb"))

contacts = {
    "Food and Cantines":{
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

@app.route("/")
def home():
    return "Backend is running successfully"

@app.route("/predict", methods=["POST"])
def predict():
    text = request.json["complaint"]
    vect = vectorizer.transform([text])
    result = model.predict(vect)[0]

    data = contacts.get(result, {
        "email":"Not Available",
        "phone":"Not Available",
        "image":""
    })

    return jsonify({
        "category": result,
        "email": data["email"],
        "phone": data["phone"],
        "image": data["image"]
    })

if __name__ == "__main__":
    app.run(debug=True)