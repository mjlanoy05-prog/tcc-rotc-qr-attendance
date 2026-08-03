const API_URL =
"YOUR_APPS_SCRIPT_URL";



function sendQR(qr){


fetch(API_URL,{

method:"POST",

body:JSON.stringify({

qr_id:qr

})

})


.then(res=>res.json())

.then(data=>{


document.getElementById("result")
.innerHTML =

data.message;



if(data.name){

document.getElementById("result")
.innerHTML +=

"<br>"+data.name+
"<br>"+data.course+
" "+data.section;

}


});


}



function success(decodedText){


sendQR(decodedText);


}



let scanner =
new Html5QrcodeScanner(

"reader",

{

fps:10,

qrbox:250

}

);


scanner.render(success);
