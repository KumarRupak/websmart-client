import { useState } from 'react'
import React from 'react'
import swal from 'sweetalert';
import uri from './services/api.json';


export const TableOrganization = (prop) => {

        const [data, setdata] = useState("")
        
        const ActivateToken=async(e)=>{
            setdata({
                organisationEmail:e.target.value,
                branchId:sessionStorage.getItem("adminId")
            })
    
        const serviceApprove=async()=>{
            try
            {
            console.log(data)
           let response=await fetch(uri.uriTableOrg
            +"?token="+sessionStorage.getItem("token"),{
              method:'PATCH',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            body:JSON.stringify(data)
          })
              if(response.status===200)
              {
                let data=await response.json()
                console.log(data)
                document.getElementById(e.target.value).innerHTML="Activate"
              }
              else{
                console.log(data)
                document.getElementById(e.target.value).innerHTML="Activate"
              }
            }
            catch(error){
             console.log(error)
             document.getElementById(e.target.value).innerHTML="Activate"
            }              
    
        }
    
            if(data.branchId!=null)
            {
                document.getElementById(e.target.value).innerHTML=
                `<div class="spinner-border text-danger" role="status">
                <span class="sr-only">.</span>
                </div>`
    
                swal({
                    title: "Are you sure?",
                    text: "Do you want to activate the key",
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
                            document.getElementById(e.target.value).innerHTML="Activate"
                    }
                  });
                }
    
    }
    
    return (

                <tr id="active"  className={prop.accountFlag===1?"bg-success text-white bg-opacity-8":"bg-danger p-1 text-dark bg-opacity-10"}>
                    <td>{prop.organisationEmail}</td>
                    <td>{prop.organisationName}</td>
                    <td>      
                    <button id={prop.organisationEmail}  type="button" class="btn btn-outline-info" value={prop.organisationEmail} onClick={ActivateToken}>Activate</button>                    
                    </td>       
                </tr>
        
    )
}
