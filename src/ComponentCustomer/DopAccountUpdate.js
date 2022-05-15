import React , {useState} from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'
import { Alert } from './Alert'
import api from './service/DopService.json'


export const DopAccountUpdate = () => {

   const [Data, setData] = useState({
    accountNumber: "",
    installment:"" ,
    accountHolderName: "",
    amount: "",
    aslaasUpdate: ""
  })

   
  
  const [accountNumber, setaccountNumber] = useState("")
  const [alert, setalert] = useState({
    alert:"",
    type:"",
    message:""
  })
     
  const accountValidate=(e)=>{
     if( e.target.value.length <12 ){
       setaccountNumber(e.target.value)
       setData({...Data,accountNumber:accountNumber})
       document.getElementById("accountNumber").style.borderColor="red"

     }else{
      document.getElementById("accountNumber").style.borderColor="green"
     }
  }


  const submitData=(e)=>{
    e.preventDefault()
    document.getElementById("loading").innerHTML="<div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div>"
    
    axios.post(api.apiAccountUpdate,Data)
    .then((res)=>{
      if(res.status==200){
        setalert({
          alert:"true",
          type:"success",
          message:"Data save successfully!!"
        })
        document.getElementById("loading").innerHTML="Sumbit"
      }else{
        setalert({
          alert:"true",
          type:"danger",
          message:"Something went wrong!"
        })
        document.getElementById("loading").innerHTML="Sumbit"
      }
    })
    .catch((e)=>{
      console.log(e)
      setalert({
        alert:"true",
        type:"danger",
        message:"Something went wrong!"
      })
      document.getElementById("loading").innerHTML="Sumbit"
    })
    
    console.log(Data)
    
  }


    return (  
      <>
      <Alert alert={alert.alert} type={alert.type} message={alert.message}/>
        <NavBar />
                                         
      <div className="container-fluid my-4 ">
        
        <form onSubmit={submitData}>
          <div className="form-group">
            <label for="account" className="font-weight-bold">
              Account Number
            </label>
            <input
              onChange={accountValidate}
              type="text"
              className="form-control"
              id="accountNumber"
              placeholder="Enter account number" 
              maxLength="12"
            />
            <small id="accountHelp" className="form-text text-muted">
              We'll never share your AccountNumber with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="holderName" className="font-weight-bold">
              Account Holdername
            </label>
            <input
             onChange={(e)=>{setData({...Data,accountHolderName:e.target.value})}}
              type="text"
              className="form-control"
              id="accountHolderName"
              placeholder="Enter Account HolderName"
            />
          </div>
          <div className="form-group">
            <label for="amount" className="font-weight-bold">
              Installment
            </label>
            <input
                  onChange={(e)=>{setData({...Data,installment:e.target.value})}}
              type="number"
              className="form-control"
              id="installment"
              placeholder="Enter Amount"
            />
          </div>
          <div className="form-group">
            <label for="amount" className="font-weight-bold">
              Amount
            </label>
            <input
             onChange={(e)=>{setData({...Data,amount:e.target.value})}}
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
            />
          </div>
          <div className="form-group">
            <label for="asllas" className="font-weight-bold">
              ASLLAS
            </label>
            <input
             onChange={(e)=>{setData({...Data,aslaasUpdate:e.target.value})}}
              type="text"
              className="form-control"
              id="aslaasUpdate"
              placeholder="Entetr ASLLAS"
            />
          </div>

          <button type="submit"   className="btn btn-primary">
            <div id="loading">Submit</div>
          </button>
        </form>
      </div>
      </> 
    );

}


