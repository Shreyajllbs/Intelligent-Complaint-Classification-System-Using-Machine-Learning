from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/classifier.pkl","rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl","rb"))

contacts = {
 "Food and Canteen Issues":{"email":"canteen@college.edu","phone":"9876543210"},
 "Housing and Transportation":{"email":"transport@college.edu","phone":"9876543220"},
 "Online Learning":{"email":"elearning@college.edu","phone":"9876543250"},
 "Career Opportunities":{"email":"placement@college.edu","phone":"9876543230"},
 "Financial Support":{"email":"finance@college.edu","phone":"9876543240"},
 "Health and Well-being Support":{"email":"health@college.edu","phone":"9876543260"},
 "Academic Support and Resources":{"email":"academic@college.edu","phone":"9876543270"},
 "Athletics and Sports":{"email":"sports@college.edu","phone":"9876543280"}
}

@app.route("/")
def home():
    return "Backend is running successfully"
@app.route("/predict", methods=["POST"])
def predict():
    text = request.json["complaint"]
    vect = vectorizer.transform([text])
    result = model.predict(vect)[0]

    return jsonify({
        "category": result,
        "contact": contacts.get(result, {"email":"Not Available","phone":"Not Available"})
    })

if __name__ == "__main__":
    app.run(debug=True)
