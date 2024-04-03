import { storageRef } from "../firebase.js";
import { ref,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

export const download = path=>{
    
    const fileRef = ref(storageRef,path);

    getDownloadURL(fileRef)
    .then(url=>{
        window.open(url);
    }).catch(error=>{
        console.log('file not found');
    });
}