import React from "react";
import { useHistory } from "react-router";
import { useState,useEffect } from "react";
import { TableBook } from "./TableBook";
import uri from './services/api.json';
import {
  MdBook,
  MdSearch,
} from "react-icons/md";
import {  Button } from "@material-ui/core";


export const Grid = () => {

  const [progress ,setprogress] = useState(0)
  const [book, setBook] = useState([]);
  let history=useHistory()
  
  const showBooks=()=>{
    history.push('/mycards')
  }

  const searchBook=()=>{
    history.push("/cibil")
  }


  const getBook = async () => {
    document.getElementById('loading1').innerHTML=
  `<div class="spinner-border text-info" role="status">
  <span class="sr-only">.</span>
  </div>`
    try {
      let response = await fetch(
          uri.uriCustomerSubscribedBook+
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
        setBook(await response.json());
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
    getBook();
    setprogress(100);
  }, []);



  return (
   
    <div className="bg-danger p-1 text-dark bg-opacity-10">

<div className="container my-3   py-4 px-3 border bg-white rounded">
        <div className="py-2">
          <label>
            <i>Book Repository</i>
          </label>
        </div>
        <div className="row ">
          <div className="col">
            <div className="p-1 m-1 border bg-light">
              <Button startIcon={<MdBook style={{ color: "indigo" }} onClick={showBooks}/>}  >
              <small>Show Books</small>
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="p-1 m-1   border bg-light">
              <Button startIcon={<MdSearch style={{ color: "indigo" }}  onClick={searchBook}/>} >
              <small>Find Book</small>
              </Button>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container my-3   py-4 px-3 border bg-white rounded">
        <div class="card m-1">
        <h7 class="card-header bg-success text-white">
          Subscribed Books
          <span class="badge badge-pill badge-danger bg-danger mx-2"> {book.length}</span>
        </h7>
        <div class="card-body" style={{ overflow: "scroll", height: "250px"  }}>
          <table class="table table-hover">
            {book.length<1?"":<thead>
              <tr>
                <th>Subscription Id</th>
                <th>Book Name</th>
                <th>Issued On</th>
                <th>Expiry On</th>
                <th>Subscription Left</th>
              </tr>
            </thead>}
            <tbody>
            {book.map((element)=>{
                return[
                <TableBook
                key={element.subcribeId}
                subcribeId={element.subcribeId}
                bookName={element.bookName} 
                issuedOn={element.issuedOn}
                expiryOn={element.expiryOn}
                subscriptionLeft={element.subscriptionLeft}
                />
                ]
              })}
              <div id="loading1" className="d-flex justify-content-center"></div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </div>
  )
};
