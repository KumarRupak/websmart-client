import React from "react";
import { useState } from "react";
import { Alert } from "./Alert";
import { Navbar } from "./Navbar";
import uri from './services/api.json';

export const SetPin = () => {

    const [data, setdata] = useState({
        
            cardNumber : "",
            otp: "",
            pin: ""
        
    })

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


    const handleCardNumber=(e)=>{
        if (e.target.value.length === 16) {
            document.getElementById("cc-number").style.borderColor = "green";
            document.getElementById("btnSendOtp").disabled = false
            document.getElementById("btnUpdatePin").disabled = false
          } else {
            document.getElementById("cc-number").style.borderColor = "red";
            document.getElementById("btnSendOtp").disabled = true
            document.getElementById("btnUpdatePin").disabled = true
          }
          setdata({ ...data, cardNumber : e.target.value })
    }

    const handleOtp=(e)=>{
        if (e.target.value.length === 4 ) {
            document.getElementById("cc-otp").style.borderColor = "green";
            document.getElementById("btnUpdatePin").disabled = false
          } else {
            document.getElementById("cc-otp").style.borderColor = "red";
            document.getElementById("btnUpdatePin").disabled = true
          }
          setdata({ ...data, otp : e.target.value })
    }

    const handlePin=(e)=>{
        if (e.target.value.length === 4) {
            document.getElementById("cc-pin").style.borderColor = "green";
            document.getElementById("btnUpdatePin").disabled = false
          } else {
            document.getElementById("cc-pin").style.borderColor = "red";
            document.getElementById("btnUpdatePin").disabled = true
          }
          setdata({ ...data, pin : e.target.value })
    }

    const  SendOtp=async ()=>{
        if(document.getElementById("cc-number").value.length===16){
          document.getElementById('loading1').innerHTML=
          `<div class="spinner-border text-danger" role="status">
          <span class="sr-only">.</span>
          </div>`
            try
            {
              let response=await fetch(uri.uriCustomerOtp+
              sessionStorage.getItem("customerId")
              +"?token="+sessionStorage.getItem("token"), {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                }
              
          }) 
          if(response.status==200){ 
                let otp=await response.text()
                showAlert("Your one time otp is : "+otp, "success");
                document.getElementById('loading1').innerHTML='SEND OTP'
          }
          else{
            showAlert("Invalid credentials", "warning");
            document.getElementById('loading1').innerHTML='SEND OTP'
          }
            }
            catch(error){
              showAlert("Please try again", "warning");
              document.getElementById('loading1').innerHTML='SEND OTP'
            }  
        }
        else
        {
            showAlert("Please enter a valid card number", "warning");
            document.getElementById('loading1').innerHTML='SEND OTP'
        }
    }

    const UpdatePin=async ()=>{

        if(document.getElementById("cc-otp").value.length===4 && document.getElementById("cc-pin").value.length===4){
          document.getElementById('loading').innerHTML=
          `<div class="spinner-border text-danger" role="status">
           <span class="sr-only">.</span>
           </div>`
            try
            {
              let response=await fetch(uri.uriCustomerSetPin
                +"?token="+sessionStorage.getItem("token"),{
              method:'PUT',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'   
            },
            body:JSON.stringify(data)
          })
              if(response.status===200)
              {
                showAlert("Your card has been successfully activated", "success");
                document.getElementById('loading').innerHTML='UPDATE'
              }
              else{
                showAlert("Please enter the valid OTP", "warning");
                document.getElementById('loading').innerHTML='UPDATE'
              }
            }
            catch(error){
              console.log(error)
              showAlert("Please try again", "warning");
              document.getElementById('loading').innerHTML='UPDATE'
            }  
        }
        else
        {
            showAlert("Please enter the valid details", "warning");
            document.getElementById('loading').innerHTML='UPDATE'
        }

    }

  return (
      <>
      <Navbar/>
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
                      
                      <span>CARD ACTIVATION</span>
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
                        ENTER OTP
                        </label>
                        <button
                          id="btnSendOtp"
                          onClick={SendOtp}
                          value="SEND"
                          type="submit"
                          className="btn btn-secondary btn-lg form-control"
                          style={{ "font-size": " .8rem" }}
                        >
                          <h7 id="loading1">  SEND OTP </h7>
                          </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        
                        <label for="cc-otp" className="control-label">
                          ENTER OTP
                        </label>
                        <input
                          type="number"
                          onChange={handleOtp}
                          id="cc-otp"
                          className="input-lg form-control cc-exp"
                          autocomplete="cc-otp"
                          placeholder="••••"
                          maxlength="4"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      
                      <label for="cc-pin" className="control-label">
                        ENTER YOUR NEW PIN
                      </label>
                      <input
                        type="password"
                        onChange={handlePin}
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
                      id="btnUpdatePin"
                      onClick={UpdatePin}
                      value="UPDATE"
                      type="submit"
                      className="btn btn-success btn-lg form-control"
                      style={{ "font-size": " .8rem" }}
                    >
                      <h7 id="loading">  UPDATE </h7>
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
