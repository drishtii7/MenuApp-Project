import axios from 'axios';
import React,{useState} from 'react'

const FileUpload = () => {
    const [singleFile,setSingleFile]=useState('');
    const singleFileChange=(e)=>{
        setSingleFile(e.target.files[0]);
    }
    const uploadSingleFile=async()=>{
        alert(singleFile);
        const formData=new FormData();
        formData.append('file',singleFile);

        await axios.post("http://127.0.0.1:8083/product/singleFile",formData)
    }
  return (
    <div>
      <input type="file" onChange={(e)=>singleFileChange(e)} />
      <button type="button" onClick={()=>uploadSingleFile()}>Upload </button>

    </div>
  )
}

export default FileUpload
