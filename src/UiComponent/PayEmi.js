import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Alert } from "./Alert";
import uri from './services/api.json';

export const PayEmi = () => {
  const [cardNumber, setcandNumber] = useState("");
  const [installment, setinstallment] = useState("");
  const [mpin, setmpin] = useState("");
  const [total, settotal] = useState(0);
  const [alert, setalert] = useState(null);
  const [installmentAmount, setinstallmentAmount] = useState(0);

  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 6000);
  };

  const handleNumber = async (e) => {
    setcandNumber(e.target.value);
    if (e.target.value.length !== 16) {
      document.getElementById("cardNumber").style.borderColor = "red";
    } else {
      document.getElementById("cardNumber").style.borderColor = "green";
    }
    if (e.target.value.length === 16) {
      try {
        let response = await fetch(
            uri.uriCardDetails+document.getElementById("cardNumber").value
            +"?token="+sessionStorage.getItem("token"),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status === 200) {
          let card = await response.json();
          setinstallmentAmount(card.instalmentAmount);
          console.log(card.instalmentAmount);
        } else {
          showAlert("Invalid Card Number", "warning");
        }
      } catch (error) {
        showAlert("Please try again", "warning");
      }
    }
  };

  const handleInstallment = (e) => {
    settotal(0);
    setinstallment(e.target.value);

    settotal(installmentAmount * e.target.value);
    console.log(cardNumber);
  };

  const handleMpin = (e) => {
    setmpin(e.target.value);
    if (e.target.value.length !== 4) {
      document.getElementById("mpin").style.borderColor = "red";
    } else {
      document.getElementById("mpin").style.borderColor = "green";
    }
  };

  const PayEmi = async () => {
    const data = {
      cardNumber: cardNumber,
      installment: installment,
      mpin: mpin,
    };

    if (cardNumber.length === 16 && installment > 0 && mpin.length === 4) {
      document.getElementById('loading').innerHTML=
      `<div class="spinner-border text-danger" role="status">
      <span class="sr-only">.</span>
      </div>`
      try {
        let response = await fetch(uri.uriPayEmi
          +"?token="+sessionStorage.getItem("token"),{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          let status = await response.json();
          console.log(status);
          if (status.transactionStatus === "success") {
            showAlert(" Status " + "success");
            document.getElementById('loading').innerHTML='Pay »'
          } else {
            showAlert(
              " Status " +
                status.transactionStatus +
                " Reason " +
                status.transactionReason,
              "warning"
            );
            document.getElementById('loading').innerHTML='Pay »'
          }
        } else {
          showAlert("Invalid credentials", "warning");
          document.getElementById('loading').innerHTML='Pay »'
        }
      } catch (error) {
        showAlert("Please try again", "warning");
        document.getElementById('loading').innerHTML='Pay »'
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
                <label className="control-label">Instalment</label>
                <input
                  onChange={handleInstallment}
                  value={installment}
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
              <div className="col-md-12">
                <br />
                <div className="form-control total btn btn-info">
                  Total:
                  <span className="amount">₹ {total}</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 form-group">
                <br />
                <button
                  onClick={PayEmi}
                  className="form-control btn btn-primary submit-button"
                  type="submit"
                >
                <h6 id="loading">  Pay » </h6>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};
