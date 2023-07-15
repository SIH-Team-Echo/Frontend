import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "react-bootstrap";

import SearchBar from "../Components/SearchBar";

const StockChart = () => {
  const [chartData, setChartData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedCompany, setSelectedCompany] = useState("");

  const handleCompanySelect = (symbol) => {
    setSelectedCompany(symbol);
    setIsLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = selectedCompany;
        const apiUrl = `http://127.0.0.1:5000/predicts/${symbol}.SI`;
        const response = await fetch(apiUrl, {
          method: "GET",
        });
        const data = await response.json();
        setChartData(data.cadata);
        setIsLoading(false);
        // Extract the necessary data from the API response
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [selectedCompany]);
  console.log(chartData);

  return (
    <div className="dashboard-container container-sh-pd ">
      <div className="options-search">
        <SearchBar onCompanySelect={handleCompanySelect} />
      </div>

      {isLoading ? ( // Display loading spinner while data is being fetched
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        chartData && (
          <ResponsiveContainer width={"100%"} height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Close_x"
                name="Actual Price"
                stroke="#8884d8"
                tickCount={10}
                interval={0}
              />
              <Line
                name="Predicted Price"
                type="monotone"
                dataKey="Close_y"
                stroke="#ff7300"
              />
            </LineChart>
          </ResponsiveContainer>
        )
      )}
    </div>
  );
};

export default StockChart;
