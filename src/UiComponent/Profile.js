import React from "react";
import { Navbar } from "./Navbar";
import { Redirect } from "react-router";
import { useState,useEffect } from "react";
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';

export const Profile = () => {

  const [data, setData] = useState({});
  const [progress ,setprogress] = useState(0)

  const getProfile = async () => {
    try {
      let response = await fetch(
          uri.uriCustomerProfile+
          sessionStorage.getItem("customerId")
          +"?token="+sessionStorage.getItem("token"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/",
            "Accept" : "application/json",
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
    getProfile();
  }, []);

  return (
    sessionStorage.getItem("customerId")!==null ? (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
      <Navbar />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm py-3">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Customer Id</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.customerId}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Account Balance</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.balance}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">IFSC Code</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.ifscCode}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Pand Id</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.panId}</div>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">My Cibil</i>{" "}
                        Score
                      </h6>
                      <small>CIBIL Score</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width : data.cibilScore }}
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="900"
                        ></div>
                      </div>
                      <small>Score</small>
                      <div className="col-sm-3">
                        <h6 className="mb-0">{data.cibilScore}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">My credit</i>
                        Elegibility
                      </h6>
                      <small>Elegibility</small>
                      <div className="col-sm-3">
                        <h6 className="mb-0">{data.cardEligibility===0?'No':'Yes'}</h6>
                      </div><br/>
                      <small>Card Type</small>
                      <div className="col-sm-3">
                        <h6 className="mb-0">{data.cardType}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     ):<Redirect to="/login"/>
  );
};
