
import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router";
import { Alert } from "./Alert";
import uri from './services/api.json';



export const Login = () => {
  const [userId, setUserId] = useState("")
  const [password, setpassword] = useState("")
  const [role, setRole] = useState("")
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
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) == true)
    {
      document.getElementById("userId").style.borderColor="green"
    }
    else{
      document.getElementById("userId").style.borderColor="red"
    }
    setUserId(e.target.value)
    setRole(document.getElementById("role").value);
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
      userId:userId,
      password:password
  }

  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.userId) == true  && data.password.length>4 && role=="customer")
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
        let auth=await response.json()
        if(auth.role==="CUSTOMER")
        {
          var id=""
          for(var i=0;i<userId.length;i++){
            if(userId.charCodeAt(i)>=48 && userId.charCodeAt(i)<=57){
              break
            }else{
            id=id+userId.charAt(i)
            }
          }
        sessionStorage.setItem("customerName",id)
        sessionStorage.setItem("customerId",userId)
        sessionStorage.setItem("token",auth.token)
        history.push("/cushome")
        }
        else{
          showAlert("Invalid credentials", "warning");
        document.getElementById('loading').innerHTML='Login'
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
   
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.userId) == true  && data.password.length>4 && role=="admin")
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
        let auth=await response.json()
        if(auth.role==="ADMIN")
        {
          var id=""
          for(var i=0;i<userId.length;i++){
            if(userId.charCodeAt(i)>=48 && userId.charCodeAt(i)<=57){
              break
            }else{
            id=id+userId.charAt(i)
            }
          }
          sessionStorage.setItem("adminName",id)
          sessionStorage.setItem("adminId",userId)
          sessionStorage.setItem("token",auth.token)
          history.push("/adminhome")
        }
        else{
          showAlert("Invalid credentials", "warning");
          document.getElementById('loading').innerHTML='Login'
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
      <span class="text-muted">Select Role</span>
    </div>
    <div class="bg-dark p-4">
    <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="role">
    <option selected>customer</option>
    <option value="admin">admin</option>
  </select>

    </div>
  </div>
  <nav class="navbar navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <p className="text-muted fw-bold mx-3">Ebook</p>
  </nav>
</div>
 
     <Alert alert={alert} />
      <section className="vh-100 bg-info p-1 text-dark bg-opacity-10">
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
                    value={userId}
                    type="email"
                    id="userId"
                    className="form-control form-control-lg"
                    placeholder="Enter ID"
                    autoComplete="off"
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
                    className="btn btn-primary bg-info btn-lg"
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
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </section>
    </>
  );
};
