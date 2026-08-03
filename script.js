const API_URL =
"https://script.google.com/macros/s/AKfycbw70zMh8Sur4dw66nd8Wjzn20tYrxO_f6y-c7CYhTYA7NeAJ8uD-XSS0Plb2qDT5mgj/exec";





let scannedQR = "";





// START CAMERA

function startCamera(){



Html5Qrcode.getCameras()

.then(cameras=>{


if(cameras.length === 0){

alert(
"No camera detected"
);

return;

}



// choose rear camera

let cameraId =
cameras[cameras.length-1].id;



let qrScanner =
new Html5Qrcode(
"reader"
);





qrScanner.start(


cameraId,


{


fps:20,


qrbox:{
width:300,
height:300
},


aspectRatio:1.0


},



(qrCode)=>{


console.log(
"QR:",
qrCode
);



scannedQR = qrCode;



document
.getElementById("status")
.innerHTML =
"QR Detected: "
+
qrCode;



sendAttendance(qrCode);



},



(error)=>{

}



);



})

.catch(err=>{


alert(
"Camera error: "
+
err
);


});


}






// SEND QR TO APPS SCRIPT


function sendAttendance(qr){



fetch(
API_URL,
{


method:"POST",


body:JSON.stringify({

qr_id:qr

})


})


.then(response=>response.json())


.then(data=>{


document
.getElementById("result")
.innerHTML=


`

<h2>
${data.message}
</h2>


<h3>
${data.name || ""}
</h3>


<p>
${data.course || ""}
${data.section || ""}
</p>


`;



})



.catch(error=>{


document
.getElementById("result")
.innerHTML=
error;


});


}





startCamera();
