import React from 'react'
import { Navbar } from "./Navbar";
import { useState,useEffect } from "react";
import { TransactionTable } from './TransactionTable';
import { Redirect } from 'react-router';
import LoadingBar from 'react-top-loading-bar';
import uri from './services/api.json';

export const TransactionHistory = () => {

    const [progress ,setprogress] = useState(0)
    const [data, setData] = useState([]);

    const getData = async () => {
      try {
        let response = await fetch(
            uri.uriTransactionHistory+
            sessionStorage.getItem("customerId")
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
 <div className="container-fluid mt-100">
    <div className="row">
        <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                    <div className="active-member">
                        <div className="table-responsive">
                            <table className="table table-xs mb-0">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>amount</th>
                                        <th>interest</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map((element) => { 
                                return[ 
                                   <TransactionTable 
                                   key={element.transactionId}
                                   transactionDateShowUser={element.transactionDateShowUser}
                                   amount={element.amount}
                                   interest={element.interest}
                                   transactionDetails={element.transactionDetails}
                                   />
                                ]
                                })}
                                </tbody>
                            </table>
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
}
