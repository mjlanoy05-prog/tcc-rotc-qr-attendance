
const API_URL =
"https://script.google.com/macros/s/AKfycbw70zMh8Sur4dw66nd8Wjzn20tYrxO_f6y-c7CYhTYA7NeAJ8uD-XSS0Plb2qDT5mgj/exec";


let currentQR="";



// =====================
// SCAN QR
// =====================


function scanSuccess(text){


currentQR=text;


fetch(API_URL,{

method:"POST",

body:JSON.stringify({

qr_id:text

})

})


.then(res=>res.json())


.then(data=>{


document
.getElementById("status")
.innerHTML=data.message;



document
.getElementById("result")
.innerHTML=


`
<h2>${data.name || ""}</h2>

<p>
${data.course || ""}
${data.section || ""}
</p>

`

});


}



// START CAMERA


let scanner =
new Html5QrcodeScanner(

"reader",

{

fps:10,

qrbox:250

}

);



scanner.render(scanSuccess);






// =====================
// CHECK ATTENDANCE
// =====================


function checkAttendance(){


if(currentQR==""){


alert(
"Please scan your QR first"
);


return;


}



fetch(

API_URL+
"?action=check&qr_id="
+
currentQR

)



.then(res=>res.json())



.then(data=>{


document
.getElementById("result")
.innerHTML=


`

<h2>
${data.name}
</h2>


<p>
${data.course}
-
${data.section}
</p>


<hr>


<p>
Day 1:
${data.day1}
</p>


<p>
Day 2:
${data.day2}
</p>


<p>
Day 3:
${data.day3}
</p>


<p>
Day 4:
${data.day4}
</p>


`;



});


}
