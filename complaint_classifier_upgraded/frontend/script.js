function sendComplaint() {

    let text = document.getElementById("complaint").value;

    if (!text.trim()) {
        alert("Please enter a complaint");
        return;
    }

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
            description: "Academic Support and Resources at LBSITW address concerns related to teaching quality, study materials, examinations, and overall learning experience. By identifying and directing these complaints to the appropriate authorities, the system helps improve academic standards and enhances student learning outcomes.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/academic.jpg"
        },

        "Athletics and Sports": {
            description: "Athletics and Sports at LBSITW involve concerns related to sports facilities, equipment, and training opportunities. Proper resolution of these issues supports student participation and overall development.",
            email: "sreejaubhasi@lbsitw.ac.in",
            phone: "9400276295",
            image: "images/sports.jpeg"
        },

        "Career Opportunities": {
            description: "Career Opportunities at LBSITW focus on issues related to placements, internships, and professional guidance. Ensuring that such complaints reach the right channels helps strengthen career support systems and improves opportunities for student growth.",
            email: "cgpu@lbsitw.ac.in, anilkumar@lbsitw.ac.in",
            phone: "9495838477, Fax: 91-471-2343395, Placement Office.Ph: 91-471-2349262 ",
            image: "images/career1.jpg"
        },

        "Health and Well-being Support": {
            description: "Health and Well-being Support at LBSITW covers concerns related to physical and mental health, hygiene, and medical facilities. Proper handling of these complaints contributes to a safer and healthier campus environment.",
            email: "principal@lbsitw.ac.in",
            phone: "+91 471 2353831 , +91 471 2353720",
            image: "images/health.jpg"
        },

        "Food and Canteen Issues": {
            description: "Food and Canteen Issues at LBSITW include complaints regarding food quality, hygiene, and service standards. Addressing these concerns effectively helps maintain better dining conditions and student satisfaction.",
            email: "principal@lbsitw.ac.in",
            phone: "+919497488832",
            image: "images/canteen.jpg"
        },

        "Hostel Issues": {
            description: "Hostel Issues at LBSITW deal with accommodation, maintenance, cleanliness, and essential facilities. Ensuring that complaints are directed appropriately helps improve living conditions and overall student comfort.",
            email: "keerthivs@lbsitw.ac.in",
            phone: "9745527664 - Warden Prof.Keerthi V S",
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