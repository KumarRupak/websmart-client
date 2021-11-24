import React from "react";
import { useState,useEffect } from "react";
import { Redirect } from 'react-router';
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';
import BookUpload from "./BookUpload";
import { TableJob } from "./TableJob";
import { TableOrganization } from "./TableOrganization";

export const GirdAdmin = () => {

  const [progress ,setprogress] = useState(0)
  const [job, setJob] = useState([]);

    const getJob = async () => {
      try {
        document.getElementById('loading2').innerHTML=
    `<div class="spinner-border text-danger" role="status">
    <span class="sr-only">.</span>
    </div>`
        let response = await fetch(
            uri.uriAdminJob+"?token="+sessionStorage.getItem("token"),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status === 200) {
          setJob(await response.json());
          document.getElementById('loading2').innerHTML=""
        }
        else{
          document.getElementById('loading2').innerHTML=""
        }
      } catch (error) {
        //Log ---
        document.getElementById('loading2').innerHTML=""
      }
    };

    
    useEffect(() => {
      getJob()
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
        <h7 class="card-header text-muted" >
          Manage Book
          <span class="badge badge-pill badge-danger bg-danger mx-2"> </span>
          Access
        </h7>
        <div class="card-body bg-info d-flex justify-content-center" >
        <BookUpload/>
        </div>
      </div>

      
      
      <div id="load" className="d-flex justify-content-center"></div>
      <div class="card m-1">
        <h7 class="card-header text-muted" >
          Console
          <span class="badge badge-pill badge-danger bg-danger mx-2"> </span>
          Manage Jobs
        </h7>
        <div class="card-body" style={{ overflow: "scroll", height: "400px" }}>
          <table class="table">
            <thead>
              <tr>
                <th>Job Id</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {job.map((element)=>{
                return[
                <TableOrganization
                  key={element.jobId}
                  jobId={element.jobId} 
                  status={element.status}
                  />
                ]
              })}
              <div id="loading2"></div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    ):<Redirect to="/login"/>
  );
};
