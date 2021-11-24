
import React from 'react'
import uri from './services/api.json';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
import { useState } from "react";


export const TableCheckOut = (prop) => {

    
  const [data, setData] = useState({})

 

  const checkoutBook=async(e)=>{

    document.getElementById('loading').innerHTML=
    `<div class="spinner-border" role="status">
    <span class="sr-only"></span>
     </div>`

    setData({
      email:sessionStorage.getItem("customerId"),
      bookId:e.target.value
    })

  /*  const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Please Enter Your Profession',
      inputAttributes: {
        'aria-label': 'Enter Your Profession'
      },
      showCancelButton: true
    }) */
    
    if (true) {

       axios
       .post(uri.uriCheckoutBook+"?token="+sessionStorage.getItem("token"), data)
       .then((response) => {
         if (response.status === 200) { 
          swal("Successfully Done! ", "Your Subcription Will Expiry On : "+response.data.expiryOn)
           document.getElementById("loading").innerHTML = "Check out";
         }
       })
       .catch((error) => {
        swal("Something went wrong please try again!")
         document.getElementById("loading").innerHTML = "Check out";
       });

       
    }  else{
      document.getElementById("loading").innerHTML = "Check out";
    }
    
  }


    return (
        <>
        
                <tr className="bg-danger text-black bg-opacity-8  bg-opacity-10">
                    <td>{prop.bookName}</td>
                    <td>{prop.subscription} {prop.bookName==null?"":"days"}</td>
                    <td>{prop.bookDownloads}</td>
                    <td>   
                    {prop.bookName==null?"":<button id="loading" type="button" class="btn btn-info" value={prop.bookId} onClick={checkoutBook}>Check out</button> }                 
                    </td>
                </tr>
                </>
    )
}
