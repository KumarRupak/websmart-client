import React from "react";
import { useState } from "react";
import { Alert } from "./Alert";
import { Navbar } from "./Navbar";
import uri from './services/api.json';

export const TransferFund = () => {

  const [data, setdata] = useState({
    cardNumber: "",
    amount: 0,
    cardPin: 0,
    installmentPeriod: 0,
  });

  var emi=[]

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

  const handleCardNumber = (e) => {
    if (e.target.value.length === 16) {
      document.getElementById("cc-number").style.borderColor = "green";
      document.getElementById("btnGetEmi").disabled = false;
      document.getElementById("btnSend").disabled = false;
    } else {
      document.getElementById("cc-number").style.borderColor = "red";
      document.getElementById("btnGetEmi").disabled = true;
      document.getElementById("btnSend").disabled = true;
    }
    setdata({ ...data, cardNumber: e.target.value });
  };

  const handleAmount = (e) => {
    if (e.target.value.length > 0) {
      document.getElementById("cc-amount").style.borderColor = "green";
      document.getElementById("btnSend").disabled = false;
    } else {
      document.getElementById("cc-amount").style.borderColor = "red";
      document.getElementById("btnSend").disabled = true;
    }
    setdata({ ...data, amount: e.target.value });
  };

  const handleCardPin = (e) => {
    if (e.target.value.length === 4) {
      document.getElementById("cc-pin").style.borderColor = "green";
      document.getElementById("btnSend").disabled = false;
    } else {
      document.getElementById("cc-pin").style.borderColor = "red";
      document.getElementById("btnSend").disabled = true;
    }
    setdata({ ...data, cardPin: e.target.value });
  };

  const handleInstallmentPeriod = (e) => {
    if (e.target.value.length > 0) {
      document.getElementById("emi").innerHTML=""
      document.getElementById("cc-installment").style.borderColor = "green";
      document.getElementById("btnSend").disabled = false;
    } else {
      document.getElementById("cc-installment").style.borderColor = "red";
      document.getElementById("btnSend").disabled = true;
    }
    setdata({ ...data, installmentPeriod: e.target.value });
  };

  const getEmi = async () => {
    if (document.getElementById("cc-number").value.length === 16) {
      document.getElementById(
        "loading1"
      ).innerHTML = `<div class="spinner-border text-warning" role="status">
          <span class="sr-only">.</span>
          </div>`;
      try {
          let response = await fetch(
          uri.uriGetEmi+data.cardNumber
          +"?token="+sessionStorage.getItem("token"),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status == 200) {
          var res= await response.text()
          res=res.substr(1,res.length-2)
          emi=res.split(",")
          var html=""
          emi.map((element)=>{
            html=html+`<a href="#" class="list-group-item list-group-item-action">
                      ${element}
                      </a>`
          })
          document.getElementById("emi").innerHTML=html
          document.getElementById("loading1").innerHTML = "GET EMI OPTIONS";
        } else {
          showAlert("Invalid credentials", "warning");
          document.getElementById("loading1").innerHTML = "GET EMI OPTIONS";
        }
      } catch (error) {
        showAlert("Please try again", "warning");
        document.getElementById("loading1").innerHTML = "GET EMI OPTIONS";
      }
    } else {
      showAlert("Please enter a valid card number", "warning");
      document.getElementById("loading1").innerHTML = "GET EMI OPTIONS";
    }
  };

  const send = async () => {
    if (
      document.getElementById("cc-installment").value > 0 &&
      document.getElementById("cc-amount").value > 0 &&
      document.getElementById("cc-pin").value.length === 4
    ) {
      document.getElementById(
        "loading"
      ).innerHTML = `<div class="spinner-border text-danger" role="status">
           <span class="sr-only">.</span>
           </div>`;
      try {
        let response = await fetch(
          uri.uriTransferFund
          +"?token="+sessionStorage.getItem("token"),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.status === 200) {
          showAlert("The amount has been successfully transfered ", "success");
          document.getElementById("loading").innerHTML = "SEND";
        } else {
          console.log(response.status)
          showAlert("Please enter the valid PIN", "warning");
          document.getElementById("loading").innerHTML = "SEND";
        }
      } catch (error) {
        console.log(error);
        showAlert("Please try again", "warning");
        document.getElementById("loading").innerHTML = "SEND";
      }
    } else {
      showAlert("Please enter the valid details", "warning");
      document.getElementById("loading").innerHTML = "SEND";
    }
  };

  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.payment/3.0.0/jquery.payment.min.js"></script>
        <div className="padding my-2">
          <div className="row">
            <div className="container-fluid d-flex justify-content-center">
              <div className="col-sm-8 col-md-6">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-6">
                        <span>TRANSFER AMOUNT</span>
                      </div>
                      <div
                        className="col-md-6 text-right"
                        style={{ "margin-top": "-5px" }}
                      >
                        <img src="https://img.icons8.com/color/36/000000/visa.png" />
                        <img src="https://img.icons8.com/color/36/000000/mastercard.png" />
                        <img src="https://img.icons8.com/color/36/000000/amex.png" />
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ height: "350px" }}>
                    <div className="form-group">
                      <label for="cc-number" className="control-label">
                        CARD NUMBER
                      </label>
                      <input
                        type="number"
                        onChange={handleCardNumber}
                        id="cc-number"
                        className="input-lg form-control cc-number"
                        autocomplete="cc-number"
                        placeholder="•••• •••• •••• ••••"
                        maxlength="16"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="cc-otp" className="control-label">
                            AMOUNT
                          </label>
                          <input
                            type="number"
                            onChange={handleAmount}
                            id="cc-amount"
                            className="input-lg form-control cc-exp"
                            autocomplete="cc-amount"
                            placeholder="0"
                            maxlength="6"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="cc-installment" className="control-label">
                            ENTER A EMI OPTION FROM
                          </label>
                          <input
                            type="number"
                            onChange={handleInstallmentPeriod}
                            id="cc-installment"
                            className="input-lg form-control cc-exp"
                            autocomplete="cc-installment"
                            placeholder="0"
                            maxlength="2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <div class="list-group">
                          <a
                            href="#"
                            class="list-group-item list-group-item-action active"
                          >
                            CHOOSE EMI
                          </a>
                          <div id="emi">
                        
                          </div>  
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col-md-12">
                      <button
                        id="btnGetEmi"
                        onClick={getEmi}
                        type="button"
                        className="btn btn-secondary btn-lg form-control"
                        style={{ "font-size": " .8rem" }}
                      >
                        <h7 id="loading1"> GET EMI OPTIONS </h7>
                      </button>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="cc-pin" className="control-label">
                          ENTER YOUR CARD PIN
                        </label>
                        <input
                          type="password"
                          onChange={handleCardPin}
                          id="cc-pin"
                          className="input-lg form-control cc-exp"
                          autocomplete="cc-pin"
                          placeholder="••••"
                          maxlength="4"
                          required
                        />
                      </div>
                    </div>
                    <br />
                    <div className="form-group">
                      <button
                        id="btnSend"
                        onClick={send}
                        type="submit"
                        className="btn btn-success btn-lg form-control"
                        style={{ "font-size": " .8rem" }}
                      >
                        <h7 id="loading"> SEND </h7>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
