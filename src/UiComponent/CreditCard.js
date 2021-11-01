import React from "react";
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import uri from './services/api.json';


export const CreditCard = (prop) => {

  const blockCard=async()=>{

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Enter the reason for block',
      inputAttributes: {
        'aria-label': 'Enter the reason for block'
      },
      showCancelButton: true
    })
    
    if (text) {
     
      document.getElementById('loading').innerHTML=
      `<div class="spinner-border" role="status">
      <span class="sr-only"></span>
       </div>`

       try {
        let response = await fetch(
          uri.uriCreditCard+prop.cardNumber
          +"?token="+sessionStorage.getItem("token"),
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        
        if (response.status === 200) {
          swal({
            text: "Success",
          });
          document.getElementById('loading').innerHTML='Block'
        }
        else{
          swal({
            text: "Failed",
          });
          document.getElementById('loading').innerHTML='Block'
        }
        
      } catch (error) {
        swal({
          text: "Please try again",
        });
        document.getElementById('loading').innerHTML='Block'
      }
    }  
    
  }

  return (
    <div>
      <div className="card">
        <div className="card-header" id={prop.cardNumber}>
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target={`#${prop.cardNumber}s`}
              aria-expanded="true"
              aria-controls={`${prop.cardNumber}s`}
            >
            <b>{prop.cardNumber}</b>
            {prop.cardFlag===1?<span className="badge badge-success bg-success m-1">Active</span>
            :<span className="badge badge-success bg-danger m-1">Inactive</span>}
            {prop.cardFlag===1?<a id="loading" href="#" class="badge badge-danger bg-danger m-2" value={prop.cardNumber}  onClick={blockCard} >Block</a>:""}
            </button>
          </h2>
        </div>

        <div
          id={`${prop.cardNumber}s`}
          className="collapse show"
          aria-labelledby={prop.cardNumber}
          data-parent="#accordionExample"
        >
          <div className="d-flex justify-content-center p-3">
            <div
              className="card text-white bg-info mb-3"
              style={{ "max-width": "38rem" }}
            >
              <div className="card-header">{prop.cardType} </div>
              <div className="card-body">
                <h5 className="card-title">
                  Available Credit Limit : {prop.cardLimit}
                </h5>
                <h6 className="card-title">
                  Issued On : {prop.creditReciveDateShowUser}
                </h6>
                <hr />
                <p className="card-text">
                  {prop.cardSpend === 0
                    ? ""
                    : `Spend Amount : ${prop.cardSpend}`}
                </p>
                <hr />
                <p className="card-text">
                  {prop.instalmentAmount === 0
                    ? ""
                    : `Instalment Amount : ${prop.instalmentAmount}`}
                </p>
                <hr />
                <p className="card-text">
                  {prop.cardPendingInstalment === 0
                    ? ""
                    : `Card Pending Instalments : ${prop.cardPendingInstalment}`}
                </p>
                <hr />
                <p className="card-text">
                  {prop.cardPaidInstalment === 0
                    ? ""
                    : `Card Paid Instalments : ${prop.cardPaidInstalment}`}
                </p>
                <hr />
                <p className="card-text">Interest Rate : {prop.interestRate}</p>
                <hr />
                <p className="card-text">
                  {prop.instalamentDateShowUser === null
                    ? ""
                    : `Instalment Due On : ${prop.instalamentDateShowUser}`}
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


