import { useState } from 'react'
import React from 'react'
import swal from 'sweetalert';
import uri from './services/api.json';


export const TableCredit = (prop) => {

    const [data, setdata] = useState("")


    const AllowCredit=async(e)=>{
        setdata({
            customerId:e.target.value,
            branchId:sessionStorage.getItem("adminId")
        })

    const serviceApprove=async()=>{
        try
        {
        console.log(data)
       let response=await fetch(uri.uriTableCredit
        +"?token="+sessionStorage.getItem("token"),{
          method:'PUT',
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
            document.getElementById(e.target.value).innerHTML="Allow"
          }
          else{
            console.log(data)
            document.getElementById(e.target.value).innerHTML="Allow"
          }
        }
        catch(error){
         console.log(error)
         document.getElementById(e.target.value).innerHTML="Allow"
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
                text: "Do you want to allow the credit",
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
                        document.getElementById(e.target.value).innerHTML="Allow"
                }
              });
        }


          
    }

    return (
        
                <tr className={prop.cardEligibility===1?"bg-success text-white bg-opacity-8":"bg-danger p-1 text-dark bg-opacity-10"}>
                    <td>{prop.customerId}</td>
                    <td>{prop.panId}</td>
                    <td>{prop.name}</td>
                    <td>{prop.email}</td>
                    <td>{prop.cardType}</td>
                    <td>{prop.cibilScore}</td>
                    <td>   
                    <button id={prop.customerId}  type="button" class="btn btn-outline-info" value={prop.customerId} onClick={AllowCredit}>Allow</button>                    
                    </td>
                </tr>
    )
}
