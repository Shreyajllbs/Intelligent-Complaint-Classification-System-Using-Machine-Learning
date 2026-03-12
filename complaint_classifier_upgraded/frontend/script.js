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

        localStorage.setItem("category", data.category);

        window.location.href = "result.html";
    })
    .catch(error => {
        console.log(error);
        alert("Backend not connected");
    });
}


// ================= RESULT PAGE =================

window.onload = function () {

    if (!window.location.pathname.includes("result.html")) return;

    const categoryData = {

        "Academic Support and Resources": {
            description: "This category includes complaints related to teaching, examinations, laboratories, library services, classroom infrastructure, and study materials.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/academic.jpg"
        },

        "Athletics and Sports": {
            description: "This category includes complaints related to sports facilities, training, equipment, and athletic activities.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/sports.jpg"
        },

        "Career Opportunities": {
            description: "This category addresses grievances related to placements, internships, workshops, training programs, and career guidance.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/career.jpg"
        },

        "Health and Well-being Support": {
            description: "This category covers medical facilities, hygiene, sanitation, emergency care, and mental health support available on campus.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/health.jpg"
        },

        "Food and Canteen Issues": {
            description: "This category focuses on food quality, hygiene, pricing, and service efficiency of the campus canteen.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/canteen.jpg"
        },

        "Hostel Issues": {
            description: "This category includes complaints regarding hostel accommodation, maintenance, water supply, electricity, and security.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/hostel.jpg"
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const navCategory = urlParams.get("category");

    let category;

    // ===============================
    // FROM NAVBAR
    // ===============================

    if (navCategory) {

        category = navCategory;

        if (!categoryData[category]) return;

        document.getElementById("predictedCategory").innerHTML = category;

        document.getElementById("descriptionText").innerHTML =
            categoryData[category].description;

        document.getElementById("email").innerHTML =
            "Email: " + categoryData[category].email;

        document.getElementById("phone").innerHTML =
            "Phone: " + categoryData[category].phone;

        // 🔥 SET FULL BACKGROUND IMAGE
        document.body.style.backgroundImage =
            "url('" + categoryData[category].image + "')";
        document.body.classList.add("result-bg");

        return;
    }

    // ===============================
    // FROM AI PREDICTION
    // ===============================

    category = localStorage.getItem("category");

    if (category === "Athletics and sports") {
        category = "Athletics and Sports";
    }

    if (category === "Food and Canteen") {
        category = "Food and Canteen Issues";
    }

    if (category === "Career opportunities") {
        category = "Career Opportunities";
    }

    if (category === "Hostel") {
        category = "Hostel Issues";
    }

    if (!category) {
        console.log("No category from backend");
        return;
    }

    document.getElementById("predictedCategory").innerHTML =
        "Predicted Category: " + category;

    document.getElementById("descriptionText").innerHTML =
        categoryData[category].description;

    document.getElementById("email").innerHTML =
        "Email: " + categoryData[category].email;

    document.getElementById("phone").innerHTML =
        "Phone: " + categoryData[category].phone;

    // 🔥 SET BACKGROUND IMAGE
    document.body.style.backgroundImage =
        "url('" + categoryData[category].image + "')";
    document.body.classList.add("result-bg");

};