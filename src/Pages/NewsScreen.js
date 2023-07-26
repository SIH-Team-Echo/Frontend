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

  const data = [
    {
      Date: "19-05-2016",
      Close_x: 0.07305498,
      Close_y: 0.13,
    },
    {
      Date: "20-05-2016",
      Close_x: 0.07305498,
      Close_y: 0.13,
    },
    {
      Date: "23-05-2016",
      Close_x: 0.07305498,
      Close_y: 0.13,
    },
    {
      Date: "24-05-2016",
      Close_x: 0.07305497,
      Close_y: 0.13,
    },
    {
      Date: "25-05-2016",
      Close_x: 0.07305497,
      Close_y: 0.13,
    },
    {
      Date: "26-05-2016",
      Close_x: 0.07305496,
      Close_y: 0.14,
    },
    {
      Date: "27-05-2016",
      Close_x: 0.07867516,
      Close_y: 0.14,
    },
    {
      Date: "30-05-2016",
      Close_x: 0.07867515,
      Close_y: 0.132,
    },
    {
      Date: "31-05-2016",
      Close_x: 0.07417899,
      Close_y: 0.132,
    },
    {
      Date: "01-06-2016",
      Close_x: 0.074179,
      Close_y: 0.132,
    },
    {
      Date: "02-06-2016",
      Close_x: 0.074178986,
      Close_y: 0.13,
    },
    {
      Date: "03-06-2016",
      Close_x: 0.07305495,
      Close_y: 0.13,
    },
    {
      Date: "06-06-2016",
      Close_x: 0.07305495,
      Close_y: 0.113,
    },
    {
      Date: "07-06-2016",
      Close_x: 0.06350062,
      Close_y: 0.113,
    },
    {
      Date: "08-06-2016",
      Close_x: 0.06350063,
      Close_y: 0.129,
    },
    {
      Date: "09-06-2016",
      Close_x: 0.07249291,
      Close_y: 0.129,
    },
    {
      Date: "10-06-2016",
      Close_x: 0.07249646,
      Close_y: 0.118,
    },
    {
      Date: "10-06-2016",
      Close_x: 0.07249291,
      Close_y: 0.118,
    },
    {
      Date: "13-06-2016",
      Close_x: 0.066314235,
      Close_y: 0.112,
    },
    {
      Date: "13-06-2016",
      Close_x: 0.06631071,
      Close_y: 0.112,
    },
    {
      Date: "14-06-2016",
      Close_x: 0.06294211,
      Close_y: 0.123,
    },
    {
      Date: "14-06-2016",
      Close_x: 0.0629386,
      Close_y: 0.123,
    },
    {
      Date: "15-06-2016",
      Close_x: 0.06912434,
      Close_y: 0.123,
    },
    {
      Date: "15-06-2016",
      Close_x: 0.0691208,
      Close_y: 0.123,
    },
    {
      Date: "16-06-2016",
      Close_x: 0.069120795,
      Close_y: 0.122,
    },
    {
      Date: "16-06-2016",
      Close_x: 0.069124326,
      Close_y: 0.122,
    },
    {
      Date: "17-06-2016",
      Close_x: 0.0685623,
      Close_y: 0.122,
    },
    {
      Date: "17-06-2016",
      Close_x: 0.06855878,
      Close_y: 0.122,
    },
    {
      Date: "20-06-2016",
      Close_x: 0.068558775,
      Close_y: 0.11,
    },
    {
      Date: "20-06-2016",
      Close_x: 0.0685623,
      Close_y: 0.11,
    },
    {
      Date: "21-06-2016",
      Close_x: 0.061818052,
      Close_y: 0.11,
    },
    {
      Date: "21-06-2016",
      Close_x: 0.061814547,
      Close_y: 0.11,
    },
    {
      Date: "22-06-2016",
      Close_x: 0.06181455,
      Close_y: 0.11,
    },
    {
      Date: "22-06-2016",
      Close_x: 0.06181804,
      Close_y: 0.11,
    },
    {
      Date: "23-06-2016",
      Close_x: 0.061818045,
      Close_y: 0.11,
    },
    {
      Date: "23-06-2016",
      Close_x: 0.061814543,
      Close_y: 0.11,
    },
    {
      Date: "24-06-2016",
      Close_x: 0.061814547,
      Close_y: 0.11,
    },
    {
      Date: "24-06-2016",
      Close_x: 0.061818037,
      Close_y: 0.11,
    },
    {
      Date: "27-06-2016",
      Close_x: 0.061814543,
      Close_y: 0.11,
    },
    {
      Date: "27-06-2016",
      Close_x: 0.06181804,
      Close_y: 0.11,
    },
    {
      Date: "28-06-2016",
      Close_x: 0.061818037,
      Close_y: 0.11,
    },
    {
      Date: "28-06-2016",
      Close_x: 0.061814535,
      Close_y: 0.11,
    },
    {
      Date: "29-06-2016",
      Close_x: 0.06181454,
      Close_y: 0.112,
    },
    {
      Date: "29-06-2016",
      Close_x: 0.06181803,
      Close_y: 0.112,
    },
    {
      Date: "30-06-2016",
      Close_x: 0.06294207,
      Close_y: 0.112,
    },
    {
      Date: "30-06-2016",
      Close_x: 0.06293858,
      Close_y: 0.112,
    },
    {
      Date: "01-07-2016",
      Close_x: 0.06294207,
      Close_y: 0.117,
    },
    {
      Date: "01-07-2016",
      Close_x: 0.06293857,
      Close_y: 0.117,
    },
    {
      Date: "04-07-2016",
      Close_x: 0.06575216,
      Close_y: 0.11,
    },
    {
      Date: "04-07-2016",
      Close_x: 0.065748654,
      Close_y: 0.11,
    },
    {
      Date: "05-07-2016",
      Close_x: 0.06181453,
      Close_y: 0.108,
    },
    {
      Date: "05-07-2016",
      Close_x: 0.06181802,
      Close_y: 0.108,
    },
    {
      Date: "08-07-2016",
      Close_x: 0.05900791,
      Close_y: 0.103,
    },
    {
      Date: "08-07-2016",
      Close_x: 0.059004433,
      Close_y: 0.103,
    },
    {
      Date: "11-07-2016",
      Close_x: 0.057880394,
      Close_y: 0.101,
    },
    {
      Date: "11-07-2016",
      Close_x: 0.05788387,
      Close_y: 0.101,
    },
    {
      Date: "12-07-2016",
      Close_x: 0.056756362,
      Close_y: 0.109,
    },
    {
      Date: "12-07-2016",
      Close_x: 0.056759823,
      Close_y: 0.109,
    },
    {
      Date: "13-07-2016",
      Close_x: 0.061255984,
      Close_y: 0.101,
    },
    {
      Date: "13-07-2016",
      Close_x: 0.0612525,
      Close_y: 0.101,
    },
    {
      Date: "14-07-2016",
      Close_x: 0.05675636,
      Close_y: 0.103,
    },
    {
      Date: "14-07-2016",
      Close_x: 0.056759823,
      Close_y: 0.103,
    },
    {
      Date: "15-07-2016",
      Close_x: 0.057880387,
      Close_y: 0.101,
    },
    {
      Date: "15-07-2016",
      Close_x: 0.057883855,
      Close_y: 0.101,
    },
    {
      Date: "18-07-2016",
      Close_x: 0.05675635,
      Close_y: 0.1,
    },
    {
      Date: "18-07-2016",
      Close_x: 0.056759816,
      Close_y: 0.1,
    },
    {
      Date: "19-07-2016",
      Close_x: 0.05619433,
      Close_y: 0.102,
    },
    {
      Date: "19-07-2016",
      Close_x: 0.056197792,
      Close_y: 0.102,
    },
    {
      Date: "20-07-2016",
      Close_x: 0.057318363,
      Close_y: 0.106,
    },
    {
      Date: "20-07-2016",
      Close_x: 0.057321828,
      Close_y: 0.106,
    },
    {
      Date: "21-07-2016",
      Close_x: 0.0595699,
      Close_y: 0.1,
    },
    {
      Date: "21-07-2016",
      Close_x: 0.059566427,
      Close_y: 0.1,
    },
    {
      Date: "22-07-2016",
      Close_x: 0.05619778,
      Close_y: 0.1,
    },
    {
      Date: "22-07-2016",
      Close_x: 0.056194328,
      Close_y: 0.1,
    },
    {
      Date: "25-07-2016",
      Close_x: 0.05619778,
      Close_y: 0.101,
    },
    {
      Date: "25-07-2016",
      Close_x: 0.056194324,
      Close_y: 0.101,
    },
    {
      Date: "26-07-2016",
      Close_x: 0.056756347,
      Close_y: 0.099,
    },
    {
      Date: "26-07-2016",
      Close_x: 0.056759804,
      Close_y: 0.099,
    },
    {
      Date: "27-07-2016",
      Close_x: 0.055635758,
      Close_y: 0.101,
    },
    {
      Date: "27-07-2016",
      Close_x: 0.055632304,
      Close_y: 0.101,
    },
    {
      Date: "28-07-2016",
      Close_x: 0.056759793,
      Close_y: 0.1,
    },
    {
      Date: "28-07-2016",
      Close_x: 0.056756336,
      Close_y: 0.1,
    },
    {
      Date: "29-07-2016",
      Close_x: 0.05619777,
      Close_y: 0.103,
    },
    {
      Date: "29-07-2016",
      Close_x: 0.05619432,
      Close_y: 0.103,
    },
    {
      Date: "01-08-2016",
      Close_x: 0.057883825,
      Close_y: 0.101,
    },
    {
      Date: "01-08-2016",
      Close_x: 0.057880368,
      Close_y: 0.101,
    },
    {
      Date: "02-08-2016",
      Close_x: 0.056759786,
      Close_y: 0.1,
    },
    {
      Date: "02-08-2016",
      Close_x: 0.056756333,
      Close_y: 0.1,
    },
    {
      Date: "03-08-2016",
      Close_x: 0.05619776,
      Close_y: 0.099,
    },
    {
      Date: "03-08-2016",
      Close_x: 0.056194313,
      Close_y: 0.099,
    },
    {
      Date: "04-08-2016",
      Close_x: 0.055632293,
      Close_y: 0.1,
    },
    {
      Date: "04-08-2016",
      Close_x: 0.055635743,
      Close_y: 0.1,
    },
    {
      Date: "05-08-2016",
      Close_x: 0.05619776,
      Close_y: 0.1,
    },
    {
      Date: "05-08-2016",
      Close_x: 0.056194305,
      Close_y: 0.1,
    },
    {
      Date: "08-08-2016",
      Close_x: 0.056197755,
      Close_y: 0.102,
    },
    {
      Date: "08-08-2016",
      Close_x: 0.05619431,
      Close_y: 0.102,
    },
    {
      Date: "11-08-2016",
      Close_x: 0.062376488,
      Close_y: 0.118,
    },
    {
      Date: "11-08-2016",
      Close_x: 0.06237996,
      Close_y: 0.118,
    },
    {
      Date: "12-08-2016",
      Close_x: 0.06631061,
      Close_y: 0.125,
    },
    {
      Date: "12-08-2016",
      Close_x: 0.066314094,
      Close_y: 0.125,
    },
    {
      Date: "15-08-2016",
      Close_x: 0.07024472,
      Close_y: 0.127,
    },
    {
      Date: "15-08-2016",
      Close_x: 0.07024822,
      Close_y: 0.127,
    },
    {
      Date: "16-08-2016",
      Close_x: 0.071372256,
      Close_y: 0.126,
    },
    {
      Date: "16-08-2016",
      Close_x: 0.071368754,
      Close_y: 0.126,
    },
    {
      Date: "17-08-2016",
      Close_x: 0.070806734,
      Close_y: 0.123,
    },
    {
      Date: "17-08-2016",
      Close_x: 0.070810236,
      Close_y: 0.123,
    },
    {
      Date: "18-08-2016",
      Close_x: 0.06912417,
      Close_y: 0.123,
    },
    {
      Date: "18-08-2016",
      Close_x: 0.06912068,
      Close_y: 0.123,
    },
    {
      Date: "19-08-2016",
      Close_x: 0.069120675,
      Close_y: 0.135,
    },
    {
      Date: "19-08-2016",
      Close_x: 0.06912418,
      Close_y: 0.135,
    },
    {
      Date: "22-08-2016",
      Close_x: 0.07586488,
      Close_y: 0.166,
    },
    {
      Date: "22-08-2016",
      Close_x: 0.07586839,
      Close_y: 0.166,
    },
    {
      Date: "23-08-2016",
      Close_x: 0.09329096,
      Close_y: 0.194,
    },
    {
      Date: "23-08-2016",
      Close_x: 0.09328738,
      Close_y: 0.194,
    },
    {
      Date: "24-08-2016",
      Close_x: 0.1090275,
      Close_y: 0.193,
    },
    {
      Date: "24-08-2016",
      Close_x: 0.10902385,
      Close_y: 0.193,
    },
    {
      Date: "25-08-2016",
      Close_x: 0.108461834,
      Close_y: 0.192,
    },
    {
      Date: "25-08-2016",
      Close_x: 0.10846547,
      Close_y: 0.192,
    },
    {
      Date: "26-08-2016",
      Close_x: 0.10790344,
      Close_y: 0.188,
    },
    {
      Date: "26-08-2016",
      Close_x: 0.107899815,
      Close_y: 0.188,
    },
    {
      Date: "29-08-2016",
      Close_x: 0.10565536,
      Close_y: 0.181,
    },
    {
      Date: "29-08-2016",
      Close_x: 0.105651736,
      Close_y: 0.181,
    },
    {
      Date: "30-08-2016",
      Close_x: 0.10172122,
      Close_y: 0.177,
    },
    {
      Date: "30-08-2016",
      Close_x: 0.101717606,
      Close_y: 0.177,
    },
    {
      Date: "31-08-2016",
      Close_x: 0.09947314,
      Close_y: 0.171,
    },
    {
      Date: "01-09-2016",
      Close_x: 0.09610103,
      Close_y: 0.172,
    },
    {
      Date: "02-09-2016",
      Close_x: 0.09666304,
      Close_y: 0.169,
    },
    {
      Date: "05-09-2016",
      Close_x: 0.09497698,
      Close_y: 0.177,
    },
    {
      Date: "06-09-2016",
      Close_x: 0.09947312,
      Close_y: 0.182,
    },
    {
      Date: "07-09-2016",
      Close_x: 0.10228321,
      Close_y: 0.18,
    },
    {
      Date: "08-09-2016",
      Close_x: 0.10115918,
      Close_y: 0.182,
    },
    {
      Date: "09-09-2016",
      Close_x: 0.102283195,
      Close_y: 0.188,
    },
    {
      Date: "14-09-2016",
      Close_x: 0.10396924,
      Close_y: 0.187,
    },
    {
      Date: "15-09-2016",
      Close_x: 0.10509327,
      Close_y: 0.195,
    },
    {
      Date: "16-09-2016",
      Close_x: 0.109589405,
      Close_y: 0.196,
    },
    {
      Date: "19-09-2016",
      Close_x: 0.11015142,
      Close_y: 0.2,
    },
    {
      Date: "20-09-2016",
      Close_x: 0.11239949,
      Close_y: 0.197,
    },
    {
      Date: "21-09-2016",
      Close_x: 0.11071343,
      Close_y: 0.196,
    },
    {
      Date: "Date",
      Close_x: "Close_x",
      Close_y: "Close_y",
    },
  ];

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
              {ticker == "B69" ? (
                <>
                  {" "}
                  <ResponsiveContainer width={"100%"} height={400}>
                    <LineChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis
                        type="number"
                        domain={[0, 0.2]}
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
                        type="monotone"
                        dataKey="Close_y"
                        name="Predicted Price"
                        stroke="#82ca9d"
                        tickCount={10}
                        interval={0}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <>
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
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )
                  )}
                </>
              )}
            </div>

            {chartData && (
              <Row>
                <Col lg={6}>
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
                    </LineChart>
                  </ResponsiveContainer>
                </Col>
                <Col lg={6}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" domain={["auto", "auto"]} />
                      <YAxis />
                      <Tooltip />
                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="stiData"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
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
