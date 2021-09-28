import React from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <p style={{ fontSize: "30px" }}>❤</p>
    </Card>
  );
};

export default Home;
