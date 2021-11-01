import React from "react";
import { TableCredit } from "./TableCredit";
import { TableOrganization } from "./TableOrganization";
import { useState,useEffect } from "react";
import { Redirect } from 'react-router';
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';

export const GirdAdmin = () => {

  const [progress ,setprogress] = useState(0)
  const [credit, setCredit] = useState([]);
  const [org, setOrg] = useState([]);

    const getCredit = async () => {
      try {
        document.getElementById('loading').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
        let response = await fetch(
            uri.uriGridAdminCredit+
            sessionStorage.getItem("adminId")
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
          setCredit(await response.json());
          document.getElementById('loading').innerHTML=""
        }
        else{
          document.getElementById('loading').innerHTML=""
        }
      } catch (error) {
        //Log ---
        document.getElementById('loading').innerHTML=""
      }
    };

    const getOrg = async () => {
      try {
        document.getElementById('loading1').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
        let response = await fetch(
            uri.uriGridAdminOrg+
            sessionStorage.getItem("adminId")
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
          setOrg(await response.json());
          document.getElementById('loading1').innerHTML=""
          
        }
        else{
          document.getElementById('loading1').innerHTML=""
        }
      } catch (error) {
        //Log ---
        document.getElementById('loading1').innerHTML=""
      }
    };
  
    useEffect(() => {
      getCredit();
      getOrg();
      setprogress(100);
    }, []);


  return (
    sessionStorage.getItem("adminId")!==null ? (
      <>
      <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
    <div className="bg-danger p-1 text-dark bg-opacity-10">
      <div class="card m-1">
        <h7 class="card-header text-muted">
          Applied For Credit
          <span class="badge badge-pill badge-danger bg-danger mx-2"> 0</span>
        </h7>
        <div class="card-body" style={{ overflow: "scroll", height: "250px" }}>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>custome Id</th>
                <th>panId</th>
                <th>name</th>
                <th>eligibility</th>
                <th>eligible For</th>
                <th>cibil Score</th>
                <th>allow Credit</th>
              </tr>
            </thead>
            <tbody>
              {credit.map((element)=>{
                return[
                <TableCredit
                key={element.customerId}
                customerId={element.customerId}
                cardEligibility={element.cardEligibility} 
                panId={element.panId}
                name={element.name}
                email={element.email}
                cardType={element.cardType}
                cibilScore={element.cibilScore}
                />
                ]
              })}
              <div id="loading"></div>
            </tbody>
          </table>
        </div>
      </div>
      <div id="load" className="d-flex justify-content-center"></div>
      <div class="card m-1">
        <h7 class="card-header text-muted">
          Applied For API Service
          <span class="badge badge-pill badge-danger bg-danger mx-2"> 0</span>
        </h7>
        <div class="card-body" style={{ overflow: "scroll", height: "250px" }}>
          <table class="table">
            <thead>
              <tr>
                <th>organization Name</th>
                <th>organization Email</th>
                <th>Service Key</th>
              </tr>
            </thead>
            <tbody>
            {org.map((element)=>{
                return[
                  <TableOrganization
                  key={element.organisationEmail}
                  accountFlag={element.accountFlag} 
                  organisationEmail={element.organisationEmail}
                  organisationName={element.organisationName}
                  />
                ]
              })}
              <div id="loading1"></div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    ):<Redirect to="/login"/>
  );
};
