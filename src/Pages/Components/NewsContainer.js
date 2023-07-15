import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";

import * as d3 from "d3";
import "./css/NewsContainer.css";

const NewsContainer = () => {
  const [newsData, setNewsData] = useState(null);
  const [distinctEntities, setDistinctEntities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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
    fetchData();
    fetchDistinctEntities();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:5000/api/news`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDistinctEntities = async () => {
    try {
      const apiUrl = `http://localhost:5000/api/news/distinctEntities`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDistinctEntities(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    filterEntities();
  }, [searchTerm, distinctEntities]);

  const filterEntities = () => {
    const filtered = distinctEntities.filter((entity) =>
      entity.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntities(filtered);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleClick = (item) => {
    navigate(`/news/${item._id}/${item.ticker}`);
  };

  const handleDropdownItemClick = (entity) => {
    setSearchTerm(entity);
    setShowDropdown(false);
  };

  const handleShow = () => {
    if (showDropdown == false) setShowDropdown(true);
    else setShowDropdown(false);
  };

  return (
    <div className="container-sh-pd">
      <h1 style={{ textAlign: "center" }}>
        Risk Assessment of Insider Trading through News Analysis
      </h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          style={{ width: "17%", margin: "2%" }}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search entities..."
          onClick={handleShow}
        />
        {showDropdown && (
          <ul className="search-results">
            {filteredEntities.map((entity) => (
              <li key={entity} onClick={() => handleDropdownItemClick(entity)}>
                {entity}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-container">
        <div className="color-display">
          <div className="color-display-text">
            Increase in Risk Score <AiOutlineArrowDown />{" "}
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
            newsData.map((item) => (
              <>
                <div key={item._id} className="hover-info">
                  <p>Summary : {item.gpt_summary}</p>
                  <p>Published Date: {item.announcement_published_datetime}</p>
                </div>
                {searchTerm === "" ||
                searchTerm === item.announcement_security_name ? (
                  <div
                    className="item"
                    key={item._id}
                    onClick={() => handleClick(item)}
                  >
                    {console.log("matched")}
                    <p className="item-text">
                      {camelCase(
                        item.announcement_issuer_name.replace(/_/g, " ")
                      )}
                    </p>
                    <div
                      className="inside-item"
                      style={{
                        backgroundColor: item.red_flag_score
                          ? d3.interpolatePurples(item.red_flag_score)
                          : "white",
                      }}
                    ></div>
                    <div
                      className="inside-item"
                      style={{
                        backgroundColor: item.speculative_score
                          ? d3.interpolateReds(item.speculative_score)
                          : "white",
                      }}
                    ></div>
                  </div>
                ) : null}
              </>
            ))}
        </div>
        <div className="color-display">
          <div className="color-display-text">
            Increase in Deviation score <AiOutlineArrowDown />{" "}
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
