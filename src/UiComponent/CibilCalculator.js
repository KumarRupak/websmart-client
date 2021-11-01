import React from "react";
import { MdSearch } from "react-icons/md";
import { CibilScore } from "./CibilScore";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Redirect } from "react-router";
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';

export const CibilCalculator = () => {

  const [panId, setpanId] = useState("");
  const [data, setdata] = useState({});
  const [progress ,setprogress] = useState(0)

  const handlePanId = async (e) => {
    setpanId(e.target.value);
    if (e.target.value.length !== 10) {
      document.getElementById("panId").style.borderColor = "red";
    } else {
      document.getElementById("panId").style.borderColor = "green";
    }

    if (e.target.value.length === 10) {
      try {
        let response = await fetch(
          uri.uriCibil+document.getElementById("panId").value
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
          let score = await response.json();
          setprogress(100);
          setdata(score);
        } else {
          //log.....
        }
      } catch (error) {
        console.log(error)
        //log..........
      }
    }
  };

  return (
    sessionStorage.getItem("customerId")!==null ? (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
      <Navbar />
      <div class="card my-1">
        <div class="card-header">CIBIL SCORE</div>
        <div class="container">
          <form>
            <div class="row my-4">
              <div class="input-group mb-3 col-sm-6">
                <input
                  id="panId"
                  onChange={handlePanId}
                  type="text"
                  class="normal form-control border-right-0"
                  placeholder="Type PanId"
                  value={panId}
                  maxlength="10"
                  style={{ "text-transform": "uppercase" }}
                />
                <div class="input-group-prepend bg-white">
                  <span class="input-group-text border-left-0 rounded-right bg-white">
                    <i>
                      <MdSearch />
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="card-body">
          <CibilScore
            score={data.score}
            parameter1={data.parameter1}
            parameter2={data.parameter2}
            parameter3={data.parameter3}
            parameter4={data.parameter4}
            eligibleLoans={data.eligibleLoans}
          />
        </div>
      </div>
    </>
     ):<Redirect to="/login"/>
  );
};
