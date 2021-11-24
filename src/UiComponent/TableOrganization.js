import { useState } from 'react'
import React from 'react'
import swal from 'sweetalert';
import uri from './services/api.json';
import { Alert } from "./Alert";


export const TableOrganization = (prop) => {

        const [jobId, setjobId] = useState("")
        const [alert, setalert] = useState(null);

    const showAlert = (message, type) => {
      setalert({
        message: message,
        type: type,
      });
  
      setTimeout(() => {
        setalert(null);
      }, 6000);
    };
        
        const updateStatus=async(e)=>{
            setjobId(e.target.value)
    
        const serviceApprove=async()=>{
            try
            {
           let response=await fetch(uri.uriAdminUpdateJob+jobId+"?token="+sessionStorage.getItem("token"),{
              method:'PATCH',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
          })
              if(response.status===200)
              {
                let data=await response.json()
                showAlert("Successfully done  ", "success");
                document.getElementById(e.target.value).innerHTML="Update"
              }
              else{
                showAlert("Something went wrong  ", "warning");
                document.getElementById(e.target.value).innerHTML="Update"
              }
            }
            catch(error){
              showAlert("Something went wrong  ", "warning");
             document.getElementById(e.target.value).innerHTML="Update"
            }              
    
        }
    
            if(jobId!="")
            {
                document.getElementById(e.target.value).innerHTML=
                `<div class="spinner-border text-danger" role="status">
                <span class="sr-only">.</span>
                </div>`
    
                swal({
                    title: "Are you sure?",
                    text: "Do you want to update the status",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Your request has been successfully accepted", {
                        icon: "success",
                      }).then((session)=>{
                        if(session){
                         serviceApprove() 
                         swal("Done!");
                        }
                      });
                    }
                    else{
                            document.getElementById(e.target.value).innerHTML="Update"
                    }
                  });
                }
    
    }
    
    return (

                <tr id="active"  className={prop.status==="Running"?"bg-success text-white bg-opacity-8":"bg-danger p-1 text-dark bg-opacity-10"}>
                    <td>{prop.jobId}</td>
                    <td>{prop.status}</td>
                    <td>      
                    <button id={prop.jobId}  type="button" class="btn btn-outline-info" value={prop.jobId} onClick={updateStatus}>Update</button>                    
                    </td>       
                </tr>
        
    )
}
