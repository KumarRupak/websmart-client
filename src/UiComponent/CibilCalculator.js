import React from "react";
import { MdSearch } from "react-icons/md";
import { CibilScore } from "./CibilScore";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Redirect } from "react-router";
import LoadingBar from 'react-top-loading-bar'
import uri from './services/api.json';
import { TableCheckOut } from "./TableCheckOut";

export const CibilCalculator = () => {

  const [panId, setpanId] = useState("");
  const [data, setdata] = useState({});
  const [progress ,setprogress] = useState(0)

  const handlePanId = async (e) => {
    setpanId(e.target.value);
    if (e.target.value.length < 3) {
      document.getElementById("panId").style.borderColor = "red";
    } else {
      document.getElementById("panId").style.borderColor = "green";
    }

    if (e.target.value.length > 3) {
      try {
        var bookN=""
        bookN= uri.uriSearchBook+document.getElementById("panId").value
        let response = await fetch(
          bookN.toLowerCase()
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
      <div class="card ">
        <div class="card-header"></div>
        <div class="container">
          <form>
            <div class="row my-4">
              <div class="input-group mb-3 col-sm-6">
                <input
                  id="panId"
                  onChange={handlePanId}
                  type="text"
                  class="normal form-control border-right-0"
                  placeholder="Type Book Name"
                  value={panId}
                  maxlength="10"
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
        <table class="table table-hover">
           {data.bookName==null?"":<thead>
              <tr>
                <th>Book Name</th>
                <th>Subscription</th>
                <th>Downloads</th>
                <th>Check Out</th>
              </tr>
            </thead>} 
            <tbody>
               
               { 
               data.bookId==null?"":
               <TableCheckOut
                key={data.bookId}
                bookId={data.bookId}
                bookName={data.bookName} 
                subscription={data.subscription}
                bookDownloads={data.bookDownloads}
                /> 
                }
              
              <div id="loading"></div>
            </tbody>
          </table>
        </div>
      </div>
    </>
     ):<Redirect to="/login"/>
  );
};
