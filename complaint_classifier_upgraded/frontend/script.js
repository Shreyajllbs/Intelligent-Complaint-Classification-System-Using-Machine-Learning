function sendComplaint() {

    let text = document.getElementById("complaint").value;

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ complaint: text })
    })
    .then(response => response.json())
    .then(data => {

        // SAVE EVERYTHING FROM BACKEND
        localStorage.setItem("category", data.category);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("image", data.image);

        window.location.href = "result.html";
    })
    .catch(error => {
        console.log(error);
        alert("Backend not connected");
    });
}

// ================= RESULT PAGE =================

window.onload = function () {

    if (window.location.pathname.includes("result.html")) {

        let category = localStorage.getItem("category");
        let email = localStorage.getItem("email");
        let phone = localStorage.getItem("phone");
        let image = localStorage.getItem("image");

        if (!category) return;

        // CATEGORY
        document.getElementById("predictedCategory").innerHTML =
            "Predicted Category: " + category;

        // CONTACT
        document.getElementById("email").innerHTML =
            "Email: " + email;

        document.getElementById("phone").innerHTML =
            "Phone: " + phone;

        // DESCRIPTIONS
        let descriptions = {

            "Academic Support and Resources":
            "This category includes complaints related to teaching, examinations, laboratories, library services, classroom infrastructure, and study materials.",

            "Athletics and Sports":
            "This category includes complaints related to sports facilities, training, equipment, and athletic activities.",

            "Career Opportunities":
            "This category addresses grievances related to placements, internships, workshops, training programs, and career guidance.",

            "Health and Well-being Support":
            "This category covers medical facilities, hygiene, sanitation, emergency care, and mental health support available on campus.",

            "Food and Canteen Issues":
            "This category focuses on food quality, hygiene, pricing, and service efficiency of the campus canteen.",

            "Hostel Issues":
            "This category includes complaints regarding hostel accommodation, maintenance, water supply, electricity, and security."
        };

        document.getElementById("descriptionText").innerHTML =
            descriptions[category] || "Description not available.";

        // IMAGE FROM BACKEND
        if (image) {
            document.getElementById("categoryImage").src = image;
        }
    }
};