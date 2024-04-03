import { download } from "./download.js";
import { listing } from "./list.js";

export const render = (arr)=>{
    const record = document.querySelector('tbody');
    
    if(record.hasChildNodes()){
        while(record.firstChild) record.removeChild(record.firstChild);
    }

    for(let i=0;i<arr.length;i++){
        
        const tr = document.createElement('tr');
        tr.id = "cell";

        const td0 = document.createElement('td');
        const checkbox = document.createElement('INPUT')
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('name','checkbox');
        checkbox.setAttribute('value',arr[i]);
        td0.appendChild(checkbox);

        const td1 = document.createElement('td');
        td1.id = 'no';
        td1.textContent = i+1;

        const td2 = document.createElement('td');
        td2.id = 'name';
        td2.textContent = arr[i];
        
        const td3 = document.createElement('td');
        td3.id = 'type';
        const p = document.createElement('p');
        p.className='status delivered';

        let t = type(arr[i]);
        if(t == 'file') p.textContent = 'download';
        else p.textContent = 'open'
        td3.appendChild(p);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        record.appendChild(tr);
    }

    const tr = record.querySelectorAll('tr');

    tr.forEach(element=>{
        let btn = element.querySelector('#type');

        btn.addEventListener('click',()=>{
            let type = btn.textContent;
            let name = element.querySelector('#name').textContent;
            let path = document.querySelector('#path').textContent;
            path = path + '/' + name;

            if(type == 'file'){
                download(path);
            }else{
                let arr = [];
                listing(path,arr).then(arr=>{
                    if(arr.length == 0) console.log('no files');
                    else render(arr);
                })
            }
        });
    });
}

export const type = (name)=>{

    let extensions = ['.pdf','.xlsx','.avif','.png','.html','.javascript','.docx','.pptx'];
    let extension = name.substring(name.indexOf('.'));

    if(extensions.includes(extension)) return 'file';
    else return 'folder';
}