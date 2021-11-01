import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Alert } from "./Alert";
import { Redirect } from "react-router";
import uri from './services/api.json';

export const SetLimit = () => {

    const [mpin, setmpin] = useState("");
    const [limit, setlimitl] = useState(0);
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
  
  
    const handleLimit = (e) => {
      setlimitl(e.target.value);
    };
  
    const handleMpin = (e) => {
      setmpin(e.target.value);
      if (e.target.value.length !== 4) {
        document.getElementById("mpin").style.borderColor = "red";
      } else {
        document.getElementById("mpin").style.borderColor = "green";
      }
    };
  
    const setLimit= async () => {
      const data = {
        customerId : sessionStorage.getItem("customerId"),
        transactionLimit: limit,
        mpin: mpin,
      };
  
      if (limit > 0 && mpin.length === 4) {
        document.getElementById('loading').innerHTML=
        `<div class="spinner-border text-danger" role="status">
          <span class="sr-only">.</span>
          </div>`
        try {
          let response = await fetch(uri.uriSetLimit, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.status === 200) {
            let status = await response
            if (status.status === 200) {
              showAlert(" Status " + "success");
              document.getElementById('loading').innerHTML='UPDATE'
            } else {
              showAlert(
                " Status " +
                  status.transactionStatus +
                  " Reason " +
                  status.transactionReason,
                "warning"
              );
              document.getElementById('loading').innerHTML='UPDATE'
            }
          } else {
            showAlert("Invalid credentials", "warning");
            document.getElementById('loading').innerHTML='UPDATE'
          }
        } catch (error) {
          showAlert("Please try again", "warning");
          document.getElementById('loading').innerHTML='UPDATE'
        }
      }
    };
  
    return (
      sessionStorage.getItem("customerId")!==null ? (
      <div>
        <Alert alert={alert} />
        <Navbar />
  
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">

              <div className="form-row d-flex justify-content-center">
                <div className="col-6 form-group cvc required m-1">
                  <label className="control-label">LIMIT</label>
                  <input
                    onChange={handleLimit}
                    value={limit}
                    autocomplete="off"
                    className="form-control "
                    placeholder="0"
                    type="number"
                    id="installment"
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
  
              <div className="form-row">
                <div className="col-md-12 form-group">
                  <br />
                  <button
                    onClick={setLimit}
                    className="form-control btn btn-primary submit-button"
                    type="submit"
                  >
                  <h6 id="loading">  UPDATE </h6>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
      ):<Redirect to="/login"/>
    );
};
