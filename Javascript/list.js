import { storageRef } from "../firebase.js";
import { ref,listAll } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

export const listing = (path,arr)=>{
    
    path = path + '/';
    document.querySelector('#path').textContent = path;
    const reference = ref(storageRef,path);

    listAll(reference)
    .then(result =>{
        
        result.items.forEach(element => {
            arr.push(element.name);
        });

        result.prefixes.forEach(element => {
            arr.push(element.name);
        });
    }).catch(error=>{
        console.log(error);
    });

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(arr);
        },2000);
    });
}
