import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Alert } from "./Alert";
import url from './services/api.json';

export const SmartPay = () => {

  const [cardNumber, setcandNumber] = useState("");
  const [mpin, setmpin] = useState("");
  const [alert, setalert] = useState(null);


  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 5000);
  };

  const handleNumber = async (e) => {
    setcandNumber(e.target.value);
    if (e.target.value.length !== 16) {
      document.getElementById("cardNumber").style.borderColor = "red";
    } else {
      document.getElementById("cardNumber").style.borderColor = "green";
    }
  };

  const handleMpin = (e) => {
    setmpin(e.target.value);
    if (e.target.value.length !== 4) {
      document.getElementById("mpin").style.borderColor = "red";
    } else {
      document.getElementById("mpin").style.borderColor = "green";
    }
  };

  const smartPay = async (e) => {
    const data = {
      cardNumber: cardNumber,
      mpin: mpin,
    };

    if (cardNumber.length === 16 && mpin.length === 4) {
      var uri=""
      if(e.target.value==='enable'){
        uri=url.uriSmartEnable+cardNumber
      }
      else{
        uri=url.uriSmartDisable
      }
      document.getElementById('loading').innerHTML=
      `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
      try {
        let response = await fetch(uri
          +"?token="+sessionStorage.getItem("token"), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          let status = await response
          if (status.status=== 200) {
            showAlert(" Status " + "success");
            document.getElementById('loading').innerHTML=''
          } else {
            showAlert(
              " Status " +
                status.transactionStatus +
                " Reason " +
                status.transactionReason,
              "warning"
            );
            document.getElementById('loading').innerHTML=''
          }
        } else {
          showAlert("Invalid credentials", "warning");
          document.getElementById('loading').innerHTML=''
        }
      } catch (error) {
        showAlert("Please try again", "warning");
        document.getElementById('loading').innerHTML=''
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Alert alert={alert} />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="form-row">
              <div className="col-xs-12 form-group required">
                <label className="control-label">Card Number</label>
                <input
                  onChange={handleNumber}
                  value={cardNumber}
                  autocomplete="off"
                  className="form-control "
                  type="text"
                  id="cardNumber"
                  maxlength="16"
                  required
                />
              </div>
            </div>

            <div className="form-row d-flex justify-content-center">
              <div className="col-6 form-group cvc required m-1">
              <label className="control-label">Date</label>
              <input
                  autocomplete="off"
                  className="form-control "
                  type="date"
                  id="date"
                  required
                />
              </div>

              <div className="col-6 form-group expiration required m-1">
                <label className="control-label">MPIN</label>
                <input
                  onChange={handleMpin}
                  value={mpin}
                  className="form-control "
                  placeholder="MPIN"
                  autocomplete="off"
                  type="password"
                  id="mpin"
                  maxlength="4"
                  required
                />
              </div>
            </div>

            <div className="form-row ">
              <div className="col-md-12 ">
                <br />
                <div className="btn-group m-5" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-danger" value={'enable'} onClick={smartPay} >DISABLE</button>
                 <button id="loading" type="button" className="btn btn-light"></button>
                 <button type="button" className="btn btn-success" value={'disable'} onClick={smartPay}>ENABLE</button>
            </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
