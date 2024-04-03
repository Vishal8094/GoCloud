import { mail } from "../firebase.js";
import { deleteRef } from "./delete.js";
import { listing } from "./list.js";
import {upload} from "./uploadFile.js";
import { render, type } from "./utility.js";

const dropArea = document.querySelector(".drag-area");
const dropmsg = document.querySelector(".drag-area h2");
const button = document.querySelector("button");
const input = document.querySelector("input");
const create = document.querySelector('#create');
const del = document.querySelector('#delete');
const msg = document.querySelector(".drag-area h4");
let arr = [];

const validation = (files)=>{

    let fileName=files[0].name;
    let extension = fileName.substring(fileName.indexOf("."));
    
    let validExtensions =['.pdf','.avif','.png','.html','.javascript','.docx'];
    document.querySelector('.drag-area span').style.visibility = 'hidden';
    document.querySelector('.drag-area button').style.visibility = 'hidden';

    if(validExtensions.includes(extension)){
        dropmsg.textContent = `${files[0].name}`;

        upload(files[0],msg);
    }
    else{
        msg.style.color = "red";
        msg.textContent = "Error : File type not supported";
        
    }
}

button.onclick=()=>{
    //hello world
    if(input.click()==true)
     console.log("Hello");
}

del.addEventListener('click',()=>{
    
    let tbody = document.querySelector('tbody');
    let checkboxes = tbody.querySelectorAll('input[name="checkbox"]:checked');
    let checkList = [];
    checkboxes.forEach(c => {
        checkList.push(c.value);
    });

    let path = document.querySelector('#path').textContent;
    
    if(checkList.length == 0) console.log('no checklist');
    else{
        checkList.forEach(name=>{
            
            path += '/' + name;
            let t = type(name);
            
            if(t == 'file'){
                deleteRef(path);
            }else{
                let arr = [];
                listing(path,arr).then(arr=>{

                    if(arr.length == 0){
                        console.log('no files');
                    }else{
                        arr.forEach(fileName=>{
                            path = path + '/' + fileName;
                            deleteRef(path);
                        });
                    }
                });
            }
        })
    }
});

create.addEventListener('click',()=>{
    let folderName = window.prompt('Enter folder name');

    if(folderName == null) throw new Error('null');

    document.querySelector('#path').textContent += `/${folderName}`;
    let f = new File([""],'blank.docx');
    upload(f,msg);

    let path = document.querySelector('#path').textContent; 
    listing(path,arr).then(arr=>{

    if(arr.length == 0){
        let file = new file('../blank.docx');
        upload(file,msg);
    }else{
        render(arr);
    }
    });    
});

input.addEventListener("change",()=>{
    let files = document.getElementById("file-input").files;
    validation(files);
});

dropArea.addEventListener("dragover",(event)=>{
    event.preventDefault();
    console.log("File is over DragArea");
    dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave",()=>{
    console.log("File is outside DragArea");
    dropArea.classList.add("active");
});

dropArea.addEventListener("drop",(event)=>{
    event.preventDefault();
    event.stopPropagation();

    let files=event.dataTransfer.files;
    if(files.length>0){
        validation(files);
    }else{
        alert('please drop file properly.');
    }
})

function loader(){
    let str = document.cookie;
    
    let email = str.substring(str.indexOf('=') + 1).toLowerCase();
    email = email.substring(0,email.indexOf('@'));

    var rootRoute = '';
    for(let i=0;i<email.length;i++){
        let ascii = email.charCodeAt(i);
        let char = email.charAt(i);

        if(ascii>=97 && ascii<=122) rootRoute += char;
    }


    let path = rootRoute;
    
    
    listing(path,arr).then(arr=>{

    if(arr.length == 0){
        let file = new File([""],'blank.docx');
        upload(file,msg);
    }else{
        render(arr);
    }
    });
}

loader();