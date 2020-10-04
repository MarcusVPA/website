import React, { useRef, useState } from 'react';
import api from '../../services/api';
import './index.css';

function Upload() {
    const [file, setFile] = useState(''); 
    const [data, getFile] = useState({ name: "", path: "" });  
    const [progress, setProgess] = useState(0); 
    const el = useRef(); 
    
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; 
        console.log("TARGET: ", e.target);
        console.log("FILE: ", file);
        setFile(file); 
    }

    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); 
        api.post('/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(response => {
            console.log("RESP: ", response);
            console.log("NAME: ", response.data.data.name);
            console.log("PATH: ", response.data.data.path);
            getFile({ name: response.data.data.name,
                     path: 'http://localhost:3333' + response.data.data.path
                   })
        }).catch(err => console.log(err))}

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">
                    Upload
                </button>
            <hr />
            {data.path && <img src={data.path} alt={data.name} />}
            </div>
        </div>
    );
}
export default Upload;