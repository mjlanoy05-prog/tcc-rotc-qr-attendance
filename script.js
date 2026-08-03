const API_URL =
"https://script.google.com/macros/s/AKfycbxTb5Rmgxx1-LX2gdlkw4xbIq9ZMQKaKqD1SR7sNW0RbOLM7e8s01uQ5G6ro3KE/exec";



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
