import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = ({ onLogout }) => {
  return (
    <header className={classes["main-header"]}>
      <h1>Mike's Homepage</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
