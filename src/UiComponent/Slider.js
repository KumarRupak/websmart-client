import React from "react";
import { OfferCards } from "./OfferCards";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import LoadingBar from 'react-top-loading-bar';
import uri from './services/api.json';

export const Slider = () => {

  const [progress ,setprogress] = useState(0)
  const [user, setuser] = useState([]);

  const getCards = async () => {
    try {
      document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
      let response = await fetch(
          uri.uriSlider+sessionStorage.getItem("customerId")
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
        setuser(await response.json());
        setprogress(100);
        document.getElementById('loading').innerHTML=""
      }
      else
      {
        document.getElementById('loading').innerHTML=""
      }
    } catch (error) {
      //Log ---
      document.getElementById('loading').innerHTML=""
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    sessionStorage.getItem("customerId")!==null ? (
      <>
      <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
    <div className="bg-danger p-2 text-dark bg-opacity-10">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide container py-2 px-2 border  rounded  bg-success  text-dark bg-opacity-9 "
        data-bs-ride="carousel"
      >
        <div id="loading"></div>
        <div className="carousel-inner ">
          {user.map((element) => {
            return [
              <OfferCards
                status={element.cardType==='gold'?1:0}
                key={element.cardType}
                cardType={element.cardType}
                cardOffers={element.cardOffers[0]}
                creditAmount={element.creditAmount}
                instalmentPeriod={element.instalmentPeriod}
                interestRate={element.interestRate} 
              />
            ];
          })} 
            <OfferCards
                status={1}
                key={'gold'}
                cardType={'gold'}
                cardOffers={'10% off on zomato'}
                creditAmount={50000}
                instalmentPeriod={'1'}
                interestRate={2} 
              />
        </div>
      </div>
    </div>
    </>
     ):<Redirect to="/login"/>
  );
};
