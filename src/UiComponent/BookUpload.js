import React from 'react';
import {useDropzone} from 'react-dropzone';
import swal from 'sweetalert';
import uri from './services/api.json';

 export default function BookUpload(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();


  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  


  const files = acceptedFiles.map(file => (
    <li key={file.path}>
     {file.path} - {file.size} bytes
    </li>
  ));


  const uploadBook=()=>{
    if(acceptedFiles.length==1)
    {
      console.log(acceptedFiles[0].size)
      if(getExtension(acceptedFiles[0].name)!='csv' && acceptedFiles[0].size<=1000000)
      {
    document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-white" role="status">
    <span class="sr-only">.</span>
    </div>`
    upload(acceptedFiles[0]);
      }else{
        swal("csv files are not acceptable or file size exceed")
      }
    }
    else
    {
      swal("Please select a file ")
    }
  }

  const revokeAccess=()=>{
    if(acceptedFiles.length==1 && getExtension(acceptedFiles[0].name)=='csv' && acceptedFiles[0].size<=1000000)
    {
    console.log(acceptedFiles[0].name)
    document.getElementById('load').innerHTML=
    `<div class="spinner-border text-white" role="status">
    <span class="sr-only">.</span>
    </div>`
    revoke(acceptedFiles[0])
  }
  else
  {
    swal("Please select a csv file or file size exceed")
  }
  }

  const upload = (file) => {

    const formData = new FormData();

formData.append('book',file);

fetch(uri.uriAdminPublishBook+"?token="+sessionStorage.getItem("token"), {
method: 'POST',
body: formData
})
.then((response) =>{
 console.log(response)
    if(response.status==200)
    {
        swal("Book uploaded successfuly done!")
        document.getElementById('loading').innerHTML='Upload Book'  
    }
    else{
        swal("Please select a valid file Or book name already exists !")
       document.getElementById('loading').innerHTML='Upload Book'  
    }

})

.catch((error) => {
    swal("Please try again!")
    document.getElementById('loading').innerHTML='Upload Book'
});
    
}


const revoke =async (file) => {
try{
    const formData = new FormData();

formData.append('csv',file);

var response=await fetch(uri.uriAdminRevokeBook+"?token="+sessionStorage.getItem("token"), {
method: 'PUT',
body: formData
})

if(response.status===200)
{
    var result=await response.json()
    swal("Successfully done!")
    var myWindow=window.open("","response","resizable=yes");
    myWindow.document.write(JSON.stringify(result))
    document.getElementById('load').innerHTML=' Revoke Access'
}
else{
    swal("Please select a valid file!")
    document.getElementById('load').innerHTML=' Revoke Access'
}
}
catch(e){
    swal("Please try again!")
    document.getElementById('load').innerHTML=' Revoke Access'
}
    
    

}


  return (
      <>
    <section className="container shadow p-1 bg-light rounded ">
      <div {...getRootProps({className: 'dropzone'})} className="d-flex justify-content-center">
        <input {...getInputProps()} />

        <p className="d-flex justify-content-center muted  my-4">Drag files here Or choose your file</p>
        
      </div>
      <aside className="">
        
        <ul>{files}</ul>
      </aside>
    </section><br/>
    <section className="d-flex justify-content-center">
    <button type="button" className=" mx-2 btn btn-outline-success shadow  rounded" onClick={uploadBook}>
    <h7 id="loading">  Upload Book </h7>
    </button>
    <button type="button" className="mx-2 btn btn-outline-danger shadow   rounded" onClick={revokeAccess}>
    <h7 id="load">  Revoke Access  </h7> 
    </button>
    </section>
    </>
  );
}

 <BookUpload />