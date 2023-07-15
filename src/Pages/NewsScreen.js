import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";

import { TiTickOutline } from "react-icons/ti";

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
  const { id, ticker } = useParams();

  const [newsData, setnewsData] = useState(null);

  const [chartData, setchartData] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const [announcementData, setAnnouncementData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [predData, setpredData] = useState(null);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = payload[0].payload.timestamp;
      const matchingAnnouncement = announcementData.find(
        (announcement) => announcement.announcement_published_datetime === date
      );

      if (matchingAnnouncement) {
        return (
          <div className="custom-tooltip">
            {matchingAnnouncement.announcement_title}
            {/* Render additional announcement details as needed */}
          </div>
        );
      }
    }

    return null;
  };

  function MydModalWithGrid(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            This news has been reviewed <TiTickOutline color="green" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Table striped bordered hover variant={theme}>
              <thead>
                <tr>
                  <th>Reviewed By</th>
                  <th>Reviewd On</th>
                  <th>Attachment Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aviral Nagpal</td>
                  <td>25-07-23</td>
                  <td>Link</td>
                  <td>Under Investigation</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:5000/api/news/${id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      const data = await response.json();
      setnewsData(data[0]);
      const closePrices = data[0]["stock_close_3m"];
      const stiData = data[0]["industry_close_3m"];
      const volumeData = JSON.parse(data[0].volume_data);
      const avgTrading = data[0]["3_mnths_avg_trading_vol"];

      const parsedData = Object.entries(volumeData).map(
        ([timestamp, price], index) => {
          const date = new Date(parseInt(timestamp));
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const formattedTimestamp = `${day}/${month}/${year
            .toString()
            .substr(-2)}`;
          return {
            timestamp: formattedTimestamp,
            closePrice: closePrices[index],
            stiData: stiData[index++],
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

  const fetchPredictionData = async () => {
    try {
      const symbol = ticker;
      const apiUrl = `http://127.0.0.1:5000/predicts/${symbol}.SI`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      const data = await response.json();
      setpredData(data.cadata);
      setIsLoading(false);
      // Extract the necessary data from the API response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const apiUrl = `http://localhost:5000/api/news/getAnnouncements/${ticker}`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      const data = await response.json();
      setAnnouncementData(data);
      // Extract the necessary data from the API response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchPredictionData();
    fetchData();
  }, [id, ticker]);

  console.log(chartData);
  // console.log(predData);
  // console.log(newsData);
  // console.log(announcementData);

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
      {/* {newsData && (
        <MydModalWithGrid show={true} onHide={() => setModalShow(false)} />
      )} */}

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

            <Table
              striped
              bordered
              hover
              variant={theme}
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th> Deviation Score</th>
                  <th> Risk Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{newsData.red_flag_score}</td>
                  <td>{newsData.speculative_score}</td>
                </tr>
              </tbody>
            </Table>

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

            <Table striped bordered hover variant={theme}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Key Points</th>
                </tr>
              </thead>
              <tbody>
                {newsData &&
                  newsData.gpt_key_points &&
                  newsData.gpt_key_points.split("\n").map((line, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{line.replace("-", "")}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

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

            <Table striped bordered hover variant={theme}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Named Entities</th>
                </tr>
              </thead>
              <tbody>
                {newsData &&
                  newsData.gpt_named_entities &&
                  newsData.gpt_named_entities.split("\n").map((line, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{line.replace("-", "")}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div>
              {isLoading ? ( // Display loading spinner while data is being fetched
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                predData && (
                  <ResponsiveContainer width={"100%"} height={400}>
                    <LineChart
                      data={predData}
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
                    dataKey="closePrice"
                    name="Close Price"
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
                  <Tooltip content={<CustomTooltip />} />
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
            {announcementData && (
              <Table striped bordered hover variant={theme}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Announcement Title</th>
                    <th>Published Date</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {announcementData &&
                    announcementData.map((announcement, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>
                          {" "}
                          {camelCase(
                            announcement.announcement_title.replace(/_/g, " ")
                          )}
                        </td>
                        <td>
                          {" "}
                          {new Date(
                            announcement.announcement_published_datetime
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            target="_blank"
                            to={`/news/${announcement._id}/${announcement.ticker}`}
                          >
                            Link
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsScreen;
