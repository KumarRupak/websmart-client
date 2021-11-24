import React from "react";
import { useState } from "react";
import axios from "axios";
import { Alert } from "./Alert";
import uri from './services/api.json';


export const SignUp = () => {

  const [data, setdata] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [password, setPassword] = useState("")

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

  const handlePassword=(e) => {
    if(e.target.value===data.password){
      document.getElementById("cnfpasswd").style.borderColor = "green";
    }else{
      document.getElementById("cnfpasswd").style.borderColor = "red";
    }
    setPassword(e.target.value)
  }

  const register = (e) => {
    e.preventDefault();
    let count = 0;

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) === true
    ) {
      count++;
      document.getElementById("email").style.borderColor = "green";
    } else {
      document.getElementById("email").style.borderColor = "red";
    }


    if (data.password.length > 7) {
      count++;
      document.getElementById("passwd").style.borderColor = "green";
    } else {
      document.getElementById("passwd").style.borderColor = "red";
    }

    if (count === 2 && data.password===password) {
      document.getElementById('loading').innerHTML=
      `<div class="spinner-border text-danger" role="status">
       <span class="sr-only">.</span>
       </div>`
      axios
        .post(uri.uriSignup, data)
        .then((response) => {
          if (response.status === 200) {
            showAlert(
              " You have been successfully registered ",
              "success"
            );
            document.getElementById('loading').innerHTML='Sign In'
            console.log(response);
          }
        })
        .catch((error) => {
          showAlert(" Email has been already registered ", "warning");
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

            <div className="form-group col-md-6">
              <label Htmlfor="password">Confirm Password</label>
              <input
                onChange={handlePassword}
                type="password"
                className="form-control"
                id="cnfpasswd"
                placeholder="Confirm Password"
                required
              />
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
