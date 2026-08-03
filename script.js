const API_URL =
"https://script.google.com/macros/s/AKfycbxvMZJ7aqYOj3mWzO2arKOWdmP6r2LNPEwHOPWpJlh4CrBeMBRlqJ9XhzjkalcKXL89/exec";



let currentQR = "";




// QR SCANNED

function qrSuccess(decodedText){


currentQR =
decodedText.trim();



document
.getElementById("status")
.innerHTML =
"Detected: "
+
currentQR;



sendAttendance();



}




// SEND QR TO APPS SCRIPT

function sendAttendance(){



fetch(API_URL,{

method:"POST",

body:JSON.stringify({

qr_id:currentQR

})

})


.then(response=>response.json())


.then(data=>{


document
.getElementById("result")
.innerHTML =

`

<h2>${data.message}</h2>

<p>
${data.name || ""}
</p>

<p>
${data.course || ""}
</p>

`;



});


}





// START CAMERA

let scanner =
new Html5QrcodeScanner(

"reader",

{

fps:20,

qrbox:300

}

);


scanner.render(qrSuccess);







// CHECK ATTENDANCE BUTTON

function checkAttendance(){



if(currentQR==""){


alert(
"Please scan QR first"
);


return;


}



fetch(

API_URL+
"?action=check&qr_id="
+
currentQR

)


.then(response=>response.json())


.then(data=>{


document
.getElementById("result")
.innerHTML =


`

<h2>
${data.name}
</h2>


<p>
${data.course}
</p>


<hr>


<p>
DAY 1:
${data.day1}
</p>


`;



});


}
