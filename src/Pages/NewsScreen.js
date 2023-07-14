import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Table from "react-bootstrap/Table";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";

const NewsScreen = () => {
  const theme = "light";
  const { id } = useParams();
  const [newsData, setnewsData] = useState(null);

  const [chartData, setchartData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5000/api/news/${id}`;
        const response = await fetch(apiUrl, {
          method: "GET",
        });
        const data = await response.json();
        setnewsData(data[0]);
        const openPrices = JSON.parse(data[0].stock_data).Open;
        const stiData = JSON.parse(data[0].sti_data).Open;
        const volumeData = JSON.parse(data[0].volume_data);
        const avgTrading = data[0]["3_mnths_avg_trading_vol"];
        // const parsedData = Object.entries(openPrices).map(
        //   ([timestamp, price]) => ({
        //     timestamp: timestamp,
        //     openPrice: price,
        //     stiData: stiData[timestamp],
        //     volumeData: volumeData[timestamp],
        //   })
        // );

        const parsedData = Object.entries(openPrices).map(
          ([timestamp, price]) => {
            const date = new Date(parseInt(timestamp));
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedTimestamp = `${day}/${month}/${year
              .toString()
              .substr(-2)}`;
            return {
              timestamp: formattedTimestamp,
              openPrice: price,
              stiData: stiData[timestamp],
              volumeData: volumeData[timestamp],
              avgTrading: avgTrading,
            };
          }
        );
        setchartData(parsedData);
        // Extract the necessary data from the API response
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log(chartData);

  const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return " "; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toUpperCase() : match.toLowerCase();
    });
  };

  const makeLine = (str) => {
    return str.replaceAll("-", "\n-");
  };

  return (
    <div>
      {newsData && (
        <div className="dashboard-container">
          <h1>Announcement Details</h1>
          <div className="announcement-info">
            <Table striped bordered hover variant={theme}>
              <thead>
                <tr>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {camelCase(newsData.announcement_title.replace(/_/g, " "))}
                  </td>
                </tr>
              </tbody>
            </Table>

            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>Issuer:</th>
                    <td>
                      {camelCase(
                        newsData.announcement_issuer_name.replace(/_/g, " ")
                      )}
                    </td>
                  </tr>
                </thead>
              </Table>
            </p>
            <Table striped bordered hover variant={theme}>
              <thead>
                <tr>
                  <th>Announcement Category</th>
                  <th>Announcement URL</th>
                  <th>Announcement Attachment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{newsData.announcement_category}</td>
                  <td>
                    <a href={newsData.announcement_url}> Click Here</a>
                  </td>
                  <td>
                    <a href={newsData.announcement_attachment_url}>
                      {" "}
                      Click Here
                    </a>
                  </td>
                </tr>
              </tbody>
            </Table>

            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>Published Date:</th>
                    <td>
                      {" "}
                      {new Date(
                        newsData.announcement_published_datetime
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                </thead>
              </Table>
            </p>
            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{newsData.gpt_summary}</td>
                  </tr>
                </tbody>
              </Table>
            </p>
            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Key Points</th>
                  </tr>
                </thead>
                <tbody>
                  {newsData.key_points.split("\n").map((line, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{line.replace("-", "")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </p>
            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Score</th>
                    <th>Justification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Sentiment Analysis</th>
                    <td>{newsData.gpt_sentiment_score}</td>
                    <td>{newsData.gpt_sentiment_justification}</td>
                  </tr>
                  <tr>
                    <th>Stock Price Impact</th>
                    <td> {newsData.gpt_stock_price_impact_score}</td>
                    <td> {newsData.gpt_stock_price_impact_justification}</td>
                  </tr>
                </tbody>
              </Table>
            </p>

            <p>
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Named Entities</th>
                  </tr>
                </thead>
                <tbody>
                  {newsData.gpt_named_entities
                    .split("\n")
                    .map((line, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{line.replace("-", "")}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </p>

            {chartData && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" domain={["auto", "auto"]} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="openPrice"
                    name="Open Price"
                    stroke="#8884d8"
                  />
                  <Line type="monotone" dataKey="stiData" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartData && (
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Legend />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="volumeData"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Line type="monotone" dataKey="avgTrading" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsScreen;
