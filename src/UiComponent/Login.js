
import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { Alert } from "./Alert";
import uri from './services/api.json';



export const Login = () => {
  const [customerId, setCustomerId] = useState("")
  const [password, setpassword] = useState("")
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

  const handleId=(e)=>{
    if(e.target.value.length<5 || e.target.value.length>6)
    {
      document.getElementById("customerId").style.borderColor="red"
    }
    else{
      document.getElementById("customerId").style.borderColor="green"
    }
    setCustomerId(e.target.value)
  }

  const handlePassword=(e)=>{
    if(e.target.value.length<8 )
    {
      document.getElementById("password").style.borderColor="red"
    }
    else{
      document.getElementById("password").style.borderColor="green"
    }
    setpassword(e.target.value)
  }


   const login=async()=>{
    const data={
      customerId:customerId,
      password:password
  }
  if(data.customerId.length===6  && data.password.length>7)
  {
    document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
    try
    {

   let response=await fetch(uri.uriLogin,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
       
    },
    body:JSON.stringify(data)
  })
      if(response.status===200)
      {
        let token=await response.text()
        if(customerId.length===6)
        {
        sessionStorage.setItem("customerId",customerId)
        sessionStorage.setItem("token",token)
        history.push("/cushome")
        }
      }
      else{
        showAlert("Invalid credentials", "warning");
        document.getElementById('loading').innerHTML='Login'
      }
    }
    catch(error){
      showAlert("Please try again", "warning");
      document.getElementById('loading').innerHTML='Login'
    }
    
  }

  if(data.customerId.length===5  && data.password.length>4)
  {
    document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
    try
    {

   let response=await fetch(uri.uriLogin,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
    },
    body:JSON.stringify(data)
  })
      if(response.status===200)
      {
        let token=await response.text()
        if(customerId.length===5)
        {
        sessionStorage.setItem("adminId",customerId)
        sessionStorage.setItem("token",token)
        history.push("/adminhome")
        }
      }
      else{
        showAlert("Invalid credentials", "warning");
        document.getElementById('loading').innerHTML='Login'
      }
    }
    catch(error){
      showAlert("Please try again", "warning");
      document.getElementById('loading').innerHTML='Login'
    }


    
  }


  }
  return (
    <>
  <div class="pos-f-t">
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-dark p-4">
      <span class="text-muted">Comming Soon</span>
    </div>
  </div>
  <nav class="navbar navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <p className="text-muted fw-bold mx-3">WebSmartCredit</p>
  </nav>
</div>
 
     <Alert alert={alert} />
      <section className="vh-100 ">
        <div className="container-fluid h-custom align-self-center ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center text-muted fw-bold mx-3 mb-0">
                    Login Here
                  </p>
                </div>

                <div className="form-outline mb-3 ">
                  <input
                    onChange={handleId}
                    value={customerId}
                    type="number"
                    id="customerId"
                    className="form-control form-control-lg"
                    placeholder="Enter ID"
                    maxlength="6"
                  required/>
                </div>

                <div className="form-outline mb-3">
                  <input
                    onChange={handlePassword}
                    value={password}
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  required/>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button
                  id="btnLogin"
                   onClick={login}
                    variant="contained"
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{
                      "padding-left": "2.5rem",
                      "padding-right": "2.5rem",
                    }}
                  >
                   <h7 id="loading">  Login  </h7>
                  </Button>
                  <p className="small text-muted fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/signupcus" className="link-danger">
                      Register
                    </Link>
                  </p>
                  <p className="small  text-muted fw-bold mt-2 pt-1 mb-0">
                    Get private API key?
                    <Link to="/signuporg" className="link-danger">
                      Authorised organization
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </section>
    </>
  );
};
