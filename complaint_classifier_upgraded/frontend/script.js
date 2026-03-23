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
            description: "Academic Support and Resources at LBSITW addresses concerns related to teaching quality, availability of study materials, examination processes, and overall academic guidance. This category is controlled by the Dean (Academics) of LBSITW, Dr. Smitha E. S. This category includes issues such as lack of proper instructional support, unclear academic procedures, difficulty in accessing learning resources, and challenges faced during evaluations. By ensuring that such complaints are directed to the appropriate authorities, the system helps enhance academic standards, improve learning experiences, and support students in achieving better educational outcomes." ,            
            email: "smitha.es@lbt.ac.in",
            phone: "9497842109",
            image: "images/academics.jpeg"
        },
        "Student Affairs": {
            description: "Student Affairs at LBSITW addresses concerns related to administrative support, student services, documentation, and overall student management processes. This category is managed by Dr. Resmi R, Faculty of ERE Program. This category includes issues such as delays in issuing certificates, difficulties in accessing student services, lack of clear communication, and challenges in administrative procedures. By ensuring that such complaints are directed to the appropriate authorities, the system helps improve efficiency, transparency, and the overall student experience. Proper handling of these concerns contributes to a more organized and student-friendly institutional environment.",
            email: "resmi@lbsitw.ac.in, resmilbs@gmail.com",
            phone: "+919446136613",
            image: "images/image.png"
        },

        "Athletics and Sports": {
            description: "Athletics and Sports at LBSITW focus on concerns related to sports facilities, equipment availability, training opportunities, and overall support for extracurricular activities. This category is managed by Dr. Sreeja U Bhasi, Union Sport Advisor at LBSITW. This category includes issues such as lack of proper infrastructure, insufficient equipment, limited access to training, and poor maintenance of sports areas. By directing these complaints to the relevant authorities, the system helps enhance sports facilities, encourage student participation, and promote overall physical development." ,
            email: "sreejaubhasi@lbsitw.ac.in",
            phone: "9400276295",
            image: "images/sports.jpeg"
        },

        "Career Opportunities": {
            description: "Career Opportunities at LBSITW focuses on concerns related to placements, internships, career guidance, and professional development support. This category is managed by the Training and Placement Officer, Dr. Anil Kumar E N. This category includes issues such as limited placement opportunities, lack of industry exposure, insufficient training programs, and unclear career guidance processes. By directing these complaints to the relevant authorities, the system helps strengthen career support services, improve employability prospects, and ensure better professional growth opportunities for students." ,
            email: "cgpu@lbsitw.ac.in, anilkumar@lbsitw.ac.in",
            phone: "9495838477, Fax: 91-471-2343395, Placement Office.Ph: 91-471-2349262 ",
            image: "images/career.png"
        },

        "Health and Well-being Support": {
            description: "Health and Well-being Support at LBSITW addresses concerns related to physical health, mental well-being, hygiene, and availability of medical facilities. This category is managed by Dr. Sreeja U Bhasi. This category includes issues such as inadequate health services, lack of counseling support, poor sanitation, and difficulties in accessing medical assistance. By ensuring that such complaints reach the appropriate authorities, the system helps promote a safer, healthier, and more supportive campus environment for students." ,   description: "Health and Well-being Support at LBSITW addresses concerns related to physical health, mental well-being, hygiene, and availability of medical facilities. This category includes issues such as inadequate health services, lack of counseling support, poor sanitation, and difficulties in accessing medical assistance. By ensuring that such complaints reach the appropriate authorities, the system helps promote a safer, healthier, and more supportive campus environment for students.",
            email: "sreejaubhasi@lbsitw.ac.in",
            phone: "9400276295",
            image: "images/health.png"
        },

        "Food and Canteen Issues": {
            description: "Food and Canteen Issues at LBSITW cover concerns related to food quality, hygiene standards, pricing, and overall dining services. This category is currently managed by Mr. Soji G, Technical Staff of the Civil Department. This category includes issues such as poor food quality, unclean conditions, limited menu options, and unsatisfactory service. By directing these complaints to the responsible authorities, the system helps improve food services, maintain hygiene standards, and enhance overall student satisfaction with campus dining facilities." ,
            email: null,
            phone: "+919497488832",
            image: "images/canteen.png"
        },

        "Hostel Issues": {
            description: "Hostel Issues at LBSITW address concerns related to accommodation, maintenance, cleanliness, and essential living facilities. This category is controlled by Dr. Keerthi V S, Warden of Hostel. This category includes issues such as poor room conditions, inadequate maintenance, water and electricity problems, and lack of proper security. By ensuring that these complaints are communicated to the appropriate authorities, the system helps improve living conditions and provides a more comfortable and secure residential experience for students.", 
            email: "keerthivs@lbsitw.ac.in",
            phone: "9745527664",
            image: "images/hostel.jpeg"
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

        let emailList = categoryData[category].email;

        document.getElementById("email").innerHTML =
            "Email: <a href='mailto:" + emailList.replace(/,\s*/g, ',') + "'>" 
            + emailList + "</a>";

        let phoneText = categoryData[category].phone;

        let phones = phoneText.match(/\+?\d[\d\s-]+/g);

        let phoneHTML = "Phone: ";

        if (phones) {
            phones.forEach(num => {
                let cleanNum = num.replace(/\s|-/g, '');
                phoneHTML += `<a href="tel:${cleanNum}">${num}</a> `;
            });
        } else {
            phoneHTML += phoneText;
        }

        document.getElementById("phone").innerHTML = phoneHTML;
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