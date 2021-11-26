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
    document.getElementById('loading2').innerHTML=
    `<div class="spinner-border text-info" role="status">
    <span class="sr-only">.</span>
    </div>`
    try {
      let response = await fetch(
          uri.uriBooks+
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
        document.getElementById('loading2').innerHTML="" 
      }
    } catch (error) {
      //Log ---
      document.getElementById('loading2').innerHTML=""
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
      <div class="alert alert-secondary d-flex justify-content-center" role="alert">
      Available Books
      </div>
    {data.map((element) => { 
    return[
    <div className="accordion p-2" id="accordionExample">
      <CreditCard
        key={element.bookId}
        bookId={element.bookId}
        bookName={element.bookName}
        subscription={element.subscription}
        bookDownloads={element.bookDownloads}
      />
    </div>
      ]
   })}
    <div className="d-flex justify-content-center" id="loading2"></div>
   </div>
   ):<Redirect to="/login"/>
  );
};
