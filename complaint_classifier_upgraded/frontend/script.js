function sendComplaint(){

let text = document.getElementById("complaint").value;

fetch("http://127.0.0.1:5000/predict",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ complaint: text })
})
.then(response => response.json())
.then(data => {

    // Save prediction data in browser storage
    localStorage.setItem("category", data.category);
    localStorage.setItem("email", data.contact.email);
    localStorage.setItem("phone", data.contact.phone);

    // Redirect to result page
    window.location.href = "result.html";
})
.catch(error=>{
console.log(error);
alert("Backend not connected");
});

}
// When result page loads
window.onload = function(){

if(window.location.pathname.includes("result.html")){

    let category = localStorage.getItem("category");
    let email = localStorage.getItem("email");
    let phone = localStorage.getItem("phone");

    document.getElementById("predictedCategory").innerHTML =
        "Predicted Category: " + category;

    document.getElementById("email").innerHTML =
    "Email: " + email;

    document.getElementById("phone").innerHTML =
    "Phone: " + phone;

    // Example description
    let descriptions = {
    "Academic": "This category includes complaints related to teaching, examinations, laboratories, library services, classroom infrastructure, and availability of study materials. It covers issues that directly affect the academic experience of students, such as problems with internal assessments, lack of learning resources, malfunctioning lab equipment, or classroom facility concerns. The focus of this category is to maintain academic quality and ensure a smooth learning environment.",
    
    "Career": "The Career Opportunities category addresses grievances related to placements, internships, training programs, workshops, and career guidance activities. It includes concerns about communication from the placement cell, scheduling issues, lack of internship updates, or insufficient career support. This category ensures that students receive proper guidance and opportunities to prepare for their professional growth.",
    
    "Health": "This category covers complaints related to medical assistance, campus health facilities, sanitation, hygiene, and mental health support. It includes concerns about first aid availability, cleanliness in campus areas, emergency response, or access to counseling services. The purpose of this category is to promote student well-being and ensure a safe and healthy campus environment.",
    
    "Canteen": "The Canteen category focuses on issues related to food quality, hygiene, pricing, service efficiency, and menu availability within the campus canteen. Complaints under this category may include concerns about cleanliness, delays in service, overpricing, or unsatisfactory food standards. It aims to maintain proper food safety and service standards for students.",
    
    "Hostel": "This category includes complaints regarding hostel accommodation, maintenance, water supply, electricity, cleanliness, security, and overall living conditions. It addresses issues such as room repairs, plumbing or electrical faults, Wi-Fi problems, and mess-related concerns. The objective of this category is to ensure a safe, comfortable, and well-maintained residential environment for students."
};

document.getElementById("descriptionText").innerHTML =
    descriptions[category] || "Description not available for this category.";

    // Set image based on category
    let imagePath = "";

if(category === "Academic"){
    imagePath = "images/academic.jpg";
}
else if(category === "Career"){
    imagePath = "images/career1.jpg";   // use career1
}
else if(category === "Health"){
    imagePath = "images/health.jpg";
}
else if(category === "Canteen"){
    imagePath = "images/canteen.jpg";
}
else if(category === "Hostel"){
    imagePath = "images/hostel1.jpg";  
    
}

document.getElementById("categoryImage").src = imagePath;

    document.getElementById("categoryImage").src = imagePath;
}
}