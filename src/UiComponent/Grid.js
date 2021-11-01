import React from "react";
import { useHistory } from "react-router";
import {
  MdAccountBalance,
  MdAccountCircle,
  MdCallToAction,
  MdSecurity,
  MdHistory,
  MdPayment,
  MdLockOutline,
  MdAlarm,
  MdAlarmOff,
  MdEuroSymbol,
  MdLocalOffer,
  MdCardGiftcard,
} from "react-icons/md";
import {  Button } from "@material-ui/core";

export const Grid = () => {

  let history=useHistory()
  
  const setLimit=()=>{
    history.push('/limit')
  }

  const transferFund=()=>{
    history.push('/transfer')
  }

  const profile=()=>{
    history.push('/cusprof')
  }

  const payEmi=()=>{
    history.push('/payemi')
  }

  const transactionHistory=()=>{
    history.push('/transaction')
  }

  const cibilCalculator=()=>{
    history.push('/cibil')
  }

  const setPin=()=>{
    history.push('/generatepin')
  }

  const myCards=()=>{
    history.push('/mycards')
  }

  const smartPay=()=>{
    history.push('/smartpay')
  }

  return (
   
    <div className="bg-danger p-1 text-dark bg-opacity-10">
      <div className="container my-3  py-3 px-3 border bg-white rounded">
        <div className="py-2">
          <label>
            <i>Transfer Money</i>
          </label>
        </div>
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          <div className="col">
            <div className="p-1 m-1 border bg-light">
              <Button
                startIcon={<MdCallToAction style={{ color: "indigo" }} onClick={setLimit} />} >
                   <small>usage</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border bg-light">
              <Button
                startIcon={<MdAccountBalance style={{ color: "indigo" }} onClick={transferFund}/>}>
                <small>ADD Money</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border bg-light">
              <Button startIcon={<MdAccountCircle style={{ color: "indigo" }} onClick={profile}/>} >
                 <small>Profile</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border bg-light">
              <Button startIcon={<MdEuroSymbol style={{ color: "indigo" }} onClick={payEmi}/>}>
                <small>Pay Emi</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border px-2 bg-light">
              <Button startIcon={<MdHistory style={{ color: "indigo" }} onClick={transactionHistory}/>} >
              <small>Transactions</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border px-2 bg-light">
              <Button startIcon={<MdLocalOffer style={{ color: "indigo" }} onClick={cibilCalculator}/>} >
              <small>CIBIL</small>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3   py-4 px-3 border bg-white rounded">
        <div className="py-2">
          <label>
            <i>Credit Manager</i>
          </label>
        </div>
        <div className="row row-cols-2  row-cols-lg-5 g-2 g-lg-3">
          <div className="col">
            <div className="p-1 m-1 border bg-light">
              <Button startIcon={<MdSecurity style={{ color: "indigo" }} onClick={setPin}/>}  >
              <small>Set Pin</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1   border bg-light">
              <Button startIcon={<MdPayment style={{ color: "indigo" }}  onClick={myCards}/>} >
              <small>MY CARDS</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border bg-light">
              <Button startIcon={<MdAlarm style={{ color: "indigo" }}  onClick={smartPay}/>}>
              <small>AUTO PAY</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1  border bg-light">
              <Button startIcon={<MdAlarmOff style={{ color: "indigo" }} onClick={smartPay}/>}>
              <small>STOP Pay</small>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
};
