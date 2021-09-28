import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = ({ onLogout }) => {
  return (
    <header className={classes["main-header"]}>
      <h1>React State Testing</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
