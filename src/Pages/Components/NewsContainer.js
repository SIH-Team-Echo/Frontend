import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";

import * as d3 from "d3";
import "./css/NewsContainer.css";

const NewsContainer = () => {
  const [newsData, setnewsData] = useState(null);
  const min = 0;
  const max = 1;
  const navigate = useNavigate();

  const colorScalePurple = d3.scaleSequential([0, 100], d3.interpolatePurples);
  const colorScaleRed = d3.scaleSequential([0, 100], d3.interpolateReds);

  const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return " "; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toUpperCase() : match.toLowerCase();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5000/api/news`;
        const response = await fetch(apiUrl, {
          method: "GET",
        });
        const data = await response.json();
        setnewsData(data);
        // Extract the necessary data from the API response
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-sh-pd">
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Risk Assessment of Insider Trading through News Analysis
      </h1>
      <div className="flex-container">
        <div className="color-display">
          <div className="color-display-text">
            Increase in risk score <AiOutlineArrowDown />{" "}
          </div>
          <div className="color-scale">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="color-block"
                style={{ backgroundColor: colorScalePurple(i * 4) }}
              ></div>
            ))}
          </div>
        </div>
        <br />
        <div className="flex-container news-container">
          {newsData &&
            newsData.map((item) => {
              const handleClick = () => {
                navigate(`/news/${item._id}`);
              };
              return (
                <div className="item" key={item._id} onClick={handleClick}>
                  <p className="item-text">
                    {" "}
                    {camelCase(
                      item.announcement_issuer_name.replace(/_/g, " ")
                    )}
                  </p>
                  <div
                    className="inside-item"
                    style={{
                      backgroundColor: d3.interpolatePurples(
                        min + Math.random() * (max - min)
                      ),
                    }}
                  ></div>
                  <div
                    className="inside-item"
                    style={{
                      backgroundColor: d3.interpolateOrRd(
                        min + Math.random() * (max - min)
                      ),
                    }}
                  ></div>
                </div>
              );
            })}
        </div>
        <div className="color-display">
          <div className="color-display-text">
            Increase in risk score <AiOutlineArrowDown />{" "}
          </div>
          <div className="color-scale">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="color-block"
                style={{ backgroundColor: colorScaleRed(i * 4) }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
