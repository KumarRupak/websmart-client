import { Grid } from "./Grid";
import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Slider } from "./Slider";
import UserList from "./UserList";

export const CustomerHome = () => {
  return (
    <>
      <Navbar></Navbar>
      <Slider/>
      <Grid></Grid>
      <Footer></Footer>
      <UserList/>
    </>
  );
};

