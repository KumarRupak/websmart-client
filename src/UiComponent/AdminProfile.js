import React from "react";
import { Redirect } from "react-router";
import { useState,useEffect } from "react";
import { NavAdmin } from "./NavAdmin";
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';

export const AdminProfile = () => {

  const [progress ,setprogress] = useState(0)
  const [data, setData] = useState({});

  const getProfile = async () => {
    try {
      let response = await fetch(
        uri.uriAdminProfile+sessionStorage.getItem("adminId")
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
    sessionStorage.getItem("adminId")!==null ? (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
      <NavAdmin />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm py-3">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Branch Id</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.branchId}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">IFSC</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.ifscCode}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Account Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.accountNo}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Branch Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.bankName}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Return Interest</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{data.returnInterest}</div>
                  </div>
                  <hr />
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
