import React from "react";
import { Redirect } from "react-router";

export const Footer = () => {
  return (
    sessionStorage.getItem("customerId")!==null ? (
    <div>
      <footer className="page-footer font-small blue border-top">
        <div className="row content"></div>
      </footer>
    </div>
    ):<Redirect to="/login"/>
  );
};
