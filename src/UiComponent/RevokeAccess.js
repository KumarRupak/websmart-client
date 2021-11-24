import React from 'react';
import {useDropzone} from 'react-dropzone';
import swal from 'sweetalert';
import uri from './services/api.json';

 export default function RevokeAccess(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
     Book Name - {file.path} - {file.size} bytes
    </li>
  ));

  const go=()=>{
    document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
    upload(acceptedFiles[0]);
  }

  const upload = (file) => {

    const formData = new FormData();

formData.append('book',file);

fetch(uri.uriAdminPublishBook+"?token="+sessionStorage.getItem("token"), {
method: 'POST',
body: formData
})
.then((response) =>{

    if(response==200)
    {
        swal("Book Uploaded Successfuly Done!")
        document.getElementById('loading').innerHTML='Upload'  
    }
    else{
        swal("Please Select A Valid File Or Book Name Already Exists !")
       document.getElementById('loading').innerHTML='Upload'  
    }

})

.catch((error) => {
    swal("Please Try Again!")
    document.getElementById('loading').innerHTML='Upload'
});
    
}


  return (
      <>
    <section className="container shadow p-1 bg-white  rounded ">
      <div {...getRootProps({className: 'dropzone'})} className="d-flex justify-content-center">
        <input {...getInputProps()} />
        <p className="text-muted">Drag 'n' drop your csv here, or click to select file</p>
      </div>
      <aside className="">
        
        <ul>{files}</ul>
      </aside>
    </section><br/>
    <section className="d-flex justify-content-center">
    <button type="button" class="btn btn-outline-dark" onClick={go}>
    <h7 id="loading">  Revoke Access  </h7> 
    </button>
    </section>
    </>
  );
}

 <RevokeAccess/>