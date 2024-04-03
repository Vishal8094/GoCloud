import { storageRef } from "../firebase.js";
import { ref,deleteObject } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

export const deleteRef = path=>{
    const delRef = ref(storageRef,path);

    deleteObject(delRef)
    .then(()=>{
        console.log('Reference deleted successfully');
    }).catch(error=>{
        console.log('ref delete error : ',error);
    });
}