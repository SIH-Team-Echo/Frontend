import React, { useState, useEffect } from "react";

import StockChart from "./Components/StockChart";
import NewsContainer from "./Components/NewsContainer";
import "./css/Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <NewsContainer />

      <StockChart />
    </>
  );
};

export default Dashboard;
