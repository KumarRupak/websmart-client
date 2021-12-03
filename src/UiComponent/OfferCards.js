import React from "react";
import { MdBookmarkBorder } from "react-icons/md";
import { useHistory } from "react-router";
import swal from 'sweetalert';
import axios from "axios";
import uri from './services/api.json';

export const OfferCards = (prop) => {
  const history = useHistory();

  const checkOut = (e) => {

    document.getElementById(e.target.value).innerHTML=
    `<div class="spinner-border" role="status">
    <span class="sr-only"></span>
     </div>`


    const data={
      email:sessionStorage.getItem("customerId"),
      bookId:e.target.value
    }

    axios
    .post(uri.uriCheckoutBook+"?token="+sessionStorage.getItem("token"), data)
    .then((response) => {
      if (response.status === 200) {
      
       if(response.data==="revoked"){

        swal("You don't have access to this book !")
        .then((value) => {
          document.getElementById(e.target.value).innerHTML = "Check out";
             // window.location.reload(true)
           });
       }
       else if(response.data==="subscribed"){

        swal("You has been already subscribed !")
        .then((value) => {
          document.getElementById(e.target.value).innerHTML = "Check out";
              //window.location.reload(true)
           });
       }
       else{
        swal("Successfully Done! ", "Your Subcription Will Expiry On : "+response.data.expiryOn)
        .then((value) => {
          document.getElementById(e.target.value).innerHTML = "Check out";
              window.location.reload(true)
           });
       }
      }
    })
    .catch((error) => {

      swal("Something went wrong please try again!")
.then((value) => {
  document.getElementById(e.target.value).innerHTML = "Check out";
     // window.location.reload(true)
   });

    });

  };

 

  return (
    <>
      <div className={`carousel-item ${prop.status===1?"active":""}`}>
        <div className="d-flex justify-content-center">
          <div className="shadow-lg  bg-dark text-light py-1  px-5  ">
            <p className=" mb-2 bg-warning text-dark d-flex justify-content-center">{prop.cardType}</p>
            <p>
              Book Name : {prop.bookName}
            </p>
            <p>
              Top Downloads : <MdBookmarkBorder /> {prop.rank} 
            </p>
          </div>
          <button
              id={prop.bookId}
              type="button"
              value={prop.bookId}
              onClick={checkOut}
              className="btn btn-danger btn-sm mx-10"
            >
              Check out
            </button>
        </div>
      </div>
    </>
  );
};
