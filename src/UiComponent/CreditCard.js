import React from "react";
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import uri from './services/api.json';
import { useState } from "react";
import axios from "axios";


export const CreditCard = (prop) => {

  const [data, setData] = useState({})

 

  const checkoutBook=async(e)=>{

    document.getElementById('loading').innerHTML=
    `<div class="spinner-border" role="status">
    <span class="sr-only"></span>
     </div>`

    setData({
      email:sessionStorage.getItem("customerId"),
      bookId:prop.bookId
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
    <div>
      <div className="card">
        <div className="card-header" id={prop.bookName}>
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target={`#${prop.bookId}s`}
              aria-expanded="true"
              aria-controls={`${prop.bookId}s`}
            >
            <b>{prop.bookName}</b>
            </button>
          </h2>
        </div>

        <div
          id={`${prop.bookId}s`}
          className="collapse show"
          aria-labelledby={prop.bookId}
          data-parent="#accordionExample"
        >
          <div className="d-flex justify-content-center p-3">
            <div
              className="card text-white bg-info mb-3"
              style={{ "max-width": "38rem" }}
            >
              <div className="card-header">
                <a id="loading" href="#" class="btn badge badge-danger bg-danger m-2" value={prop.bookId}  onClick={checkoutBook} >
                  Chcek out
                </a> 
              </div>
              <div className="card-body">
              
                <h6 className="card-title">
                  Book Id : {prop.bookId}
                </h6>
                <hr />
                <p className="card-text">
                  Book Name : {prop.bookName}
                </p>
                <hr />
                <p className="card-text">
                  Subscription : {prop.subscription}
                </p>
                <hr />
                <p className="card-text">
                  Downloads : {prop.bookDownloads}
                </p>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
 }


