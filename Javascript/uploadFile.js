import {storageRef} from "../firebase.js";
import {ref,uploadBytes} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js"; 

export function upload(file,msg){
    if(file){
        let path = document.querySelector('#path').textContent;
        const fileRef = ref(storageRef,path + '/' + file.name);

        uploadBytes(fileRef,file)
            .then((snapshot)=>{
                console.log("File uploaded !");
                let message = "File Uploaded Successfully!";
                msg.textContent = message;
                msg.style.color = "green";
            }).catch((error)=>{
                console.log("Error occured : " + error);
                let message = "Error Occured!";
                msg.textContent = message;
                msg.style.color = "red";
            });
    }else{
        console.log("File not found!");
        let message = "Error Occured!";
        msg.textContent = message;
        msg.style.color = "red";
    }
}