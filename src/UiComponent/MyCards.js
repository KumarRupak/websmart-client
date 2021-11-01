import React from "react";
import { CreditCard } from "./CreditCard";
import { Navbar } from "./Navbar";
import { useState,useEffect } from "react";
import { Redirect } from "react-router";
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';


export const MyCards = () => {

  const [progress ,setprogress] = useState(0)
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      let response = await fetch(
          uri.uriCreditCards+
          sessionStorage.getItem("customerId")
          +"?token="+sessionStorage.getItem("token"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setData(await response.json());
        setprogress(100); 
      }
    } catch (error) {
      //Log ---
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    sessionStorage.getItem("customerId")!==null ? (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
      <Navbar/>
    {data.map((element) => { 
    return[
    <div className="accordion p-2" id="accordionExample">
      <CreditCard
        key={element.cardNumber}
        cardNumber={element.cardNumber}
        cardFlag={element.cardFlag}
        cardType={element.cardType}
        cardLimit={element.cardLimit}
        cardSpend={element.cardSpend}
        creditReciveDateShowUser={element.creditReciveDateShowUser}
        instalmentAmount={element.instalmentAmount}
        cardPendingInstalment={element.cardPendingInstalment}
        cardPaidInstalment={element.cardPaidInstalment}
        interestRate={element.interestRate}
        instalamentDateShowUser={element.instalamentDateShowUser}
      />
    </div>
      ]
   })}
   </div>
   ):<Redirect to="/login"/>
  );
};
