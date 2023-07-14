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
import SearchBar from "../Components/SearchBar";

const StockChart = () => {
  const [chartData, setChartData] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState("AMZN");

  const handleCompanySelect = (symbol) => {
    setSelectedCompany(symbol);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };
  const [interval, setInterval] = useState("1month");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "a05b98e360msh5b5a6eb1199a407p1d400djsnb2be05f4c091";
        const symbol = selectedCompany;
        const apiUrl = `https://twelve-data1.p.rapidapi.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=100`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        });
        const data = await response.json();
        setChartData(data.values);
        // Extract the necessary data from the API response
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [selectedCompany, interval]);
  console.log(chartData);

  return (
    <div className="dashboard-container container-sh-pd ">
      <div className="options-search">
        <SearchBar onCompanySelect={handleCompanySelect} />
        <div className="time-btn-container">
          <button
            style={{ backgroundColor: interval === "1min" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("1min")}
          >
            1 Min
          </button>
          <button
            style={{ backgroundColor: interval === "5min" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("5min")}
          >
            5 Min
          </button>
          <button
            style={{
              backgroundColor: interval === "15min" ? "#8884d8" : "",
            }}
            onClick={() => handleIntervalChange("15min")}
          >
            15 Min
          </button>
          <button
            style={{
              backgroundColor: interval === "30min" ? "#8884d8" : "",
            }}
            onClick={() => handleIntervalChange("30min")}
          >
            30 Min
          </button>
          <button
            style={{
              backgroundColor: interval === "45min" ? "#8884d8" : "",
            }}
            onClick={() => handleIntervalChange("45min")}
          >
            45 Min
          </button>
          <button
            style={{ backgroundColor: interval === "1h" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("1h")}
          >
            1 Hour
          </button>
          <button
            style={{ backgroundColor: interval === "2h" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("2h")}
          >
            2 Hours
          </button>
          <button
            style={{ backgroundColor: interval === "4h" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("4h")}
          >
            4 Hours
          </button>
          <button
            style={{ backgroundColor: interval === "1day" ? "#8884d8" : "" }}
            onClick={() => handleIntervalChange("1day")}
          >
            1 Day
          </button>
          <button
            style={{
              backgroundColor: interval === "1week" ? "#8884d8" : "",
            }}
            onClick={() => handleIntervalChange("1week")}
          >
            1 Week
          </button>
          <button
            style={{
              backgroundColor: interval === "1month" ? "#8884d8" : "",
            }}
            onClick={() => handleIntervalChange("1month")}
          >
            1 Month
          </button>
        </div>
      </div>
      {chartData && <>{console.log(chartData)}</> && (
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis type="number" domain={[0, "dataMax+100"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              name={selectedCompany}
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StockChart;
