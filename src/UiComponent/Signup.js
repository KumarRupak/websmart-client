import React from "react";
import { useState } from "react";
import axios from "axios";
import { Alert } from "./Alert";
import uri from './services/api.json';
import swal from "sweetalert";
import { useHistory } from "react-router";

export const SignUp = () => {
  const [data, setdata] = useState({
    accountNumber: "",
    ifscCode: "",
    balance: "",
    name: "",
    email: "",
    panId: "",
    password: "",
  });

  let history=useHistory()

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

  const register = (e) => {
    e.preventDefault();
    let count = 0;
    if (data.accountNumber.length === 12) {
      count++;
      document.getElementById("accountNumber").style.borderColor = "green";
    } else {
      document.getElementById("accountNumber").style.borderColor = "red";
    }

    if (data.ifscCode.length === 11) {
      count++;
      document.getElementById("ifscCode").style.borderColor = "green";
    } else {
      document.getElementById("ifscCode").style.borderColor = "red";
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) === true
    ) {
      count++;
      document.getElementById("email").style.borderColor = "green";
    } else {
      document.getElementById("email").style.borderColor = "red";
    }

    if (data.panId.length === 10) {
      count++;
      document.getElementById("panId").style.borderColor = "green";
    } else {
      document.getElementById("panId").style.borderColor = "red";
    }

    if (data.password.length > 7) {
      count++;
      document.getElementById("passwd").style.borderColor = "green";
    } else {
      document.getElementById("passwd").style.borderColor = "red";
    }

    if (count === 5) {
      document.getElementById('loading').innerHTML=
      `<div class="spinner-border text-danger" role="status">
       <span class="sr-only">.</span>
       </div>`
      axios
        .post(uri.uriSignup, data)
        .then((response) => {
          if (response.status === 200) {
            swal("Your userId is : "+response.data.customerId,"Your mPIN is : "+response.data.mPIN).then(
              (value) => {
               history.push("/")
              }
            );
            showAlert(
              " You have been registered your ID and MPIN has been sent your email ",
              "success"
            );
            document.getElementById('loading').innerHTML='Sign In'
            console.log(response);
          }
        })
        .catch((error) => {
          showAlert(" Please try again ", "warning");
          document.getElementById('loading').innerHTML='Sign In'
        });
    } else {
      showAlert(" Plase fill the valid details ", "warning");
      document.getElementById('loading').innerHTML='Sign In'
    }
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="container my-3  rounded ">
        <form onSubmit={register}>
          <div className="form-row ">
            <div className="form-group col-md-6">
              <label Htmlfor="name">Name</label>
              <input
                onChange={(e) => setdata({ ...data, name: e.target.value })}
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
                style={{ "text-transform": "uppercase" }}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label Htmlfor="email">Email</label>
              <input
                onChange={(e) => setdata({ ...data, email: e.target.value })}
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label Htmlfor="pandId">Pan Id</label>
              <input
                onChange={(e) => setdata({ ...data, panId: e.target.value })}
                type="text"
                className="form-control"
                id="panId"
                placeholder="Pan Number"
                maxlength="10"
                style={{ "text-transform": "uppercase" }}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label Htmlfor="accountNumber">Bank Account Number</label>
              <input
                onChange={(e) =>
                  setdata({ ...data, accountNumber: e.target.value })
                }
                type="number"
                className="form-control"
                id="accountNumber"
                placeholder="Account Number"
                maxlength="12"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label Htmlfor="password">Password</label>
              <input
                onChange={(e) => setdata({ ...data, password: e.target.value })}
                type="password"
                className="form-control"
                id="passwd"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-row  d-flex">
              <div className="form-group col-md-3">
                <label Htmlfor="ifscCode">Ifsc Code</label>
                <input
                  onChange={(e) =>
                    setdata({ ...data, ifscCode: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="ifscCode"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label Htmlfor="balance">Account Balance</label>
                <input
                  onChange={(e) =>
                    setdata({ ...data, balance: e.target.value })
                  }
                  type="number"
                  className="form-control"
                  id="balance"
                  required
                />
              </div>
            </div>
          </div>
          <br />
          <button type="submit" class="btn btn-primary btn-sm my-3">
          <h7 id="loading">  Sign In </h7>
          </button>
        </form>
      </div>
    </>
  );
};
