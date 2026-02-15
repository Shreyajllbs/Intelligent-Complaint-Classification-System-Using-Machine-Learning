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

document.getElementById("category").innerHTML =
"Category: " + data.category;

document.getElementById("email").innerHTML =
"Email: " + data.contact.email;

document.getElementById("phone").innerHTML =
"Phone: " + data.contact.phone;

})
.catch(error=>{
console.log(error);
alert("Backend not connected");
});

}
