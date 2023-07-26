import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import * as d3 from "d3";
import "./css/NewsContainer.css";

import Table from "react-bootstrap/Table";

const NewsContainer = () => {
  const [newsData, setNewsData] = useState(null);
  const [distinctEntities, setDistinctEntities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const min = 0;
  const max = 1;
  const navigate = useNavigate();

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked again, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the sort column with ascending order
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = newsData
    ? [...newsData].sort((a, b) => {
        let compare = 0;
        if (a[sortColumn] > b[sortColumn]) {
          compare = 1;
        } else if (a[sortColumn] < b[sortColumn]) {
          compare = -1;
        }
        return sortDirection === "asc" ? compare : -compare;
      })
    : [];

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
      <div className="color-display">
        <div className="color-display-text">
          Increase in Risk Score <AiOutlineArrowRight />{" "}
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

      <div style={{ marginTop: "2%" }} className="color-display">
        <div className="color-display-text">
          Increase in Deviation score <AiOutlineArrowRight />{" "}
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

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          style={{ width: "21.5%", marginLeft: "6%" }}
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
        <br />
        <div className="flex-container news-container">
          <Table striped bordered>
            <thead>
              <tr>
                <th onClick={() => handleSort("announcement_security_name")}>
                  Organisation
                </th>
                <th onClick={() => handleSort("announcement_title")}>Title</th>
                <th onClick={() => handleSort("red_flag_score")}>Risk Score</th>
                <th onClick={() => handleSort("speculative_score")}>
                  Deviation Score
                </th>
              </tr>
            </thead>
            <tbody>
              {newsData &&
                sortedData.map((item) => (
                  <>
                    {searchTerm === "" ||
                    searchTerm === item.announcement_security_name ? (
                      <tr onClick={() => handleClick(item)}>
                        <td>
                          {" "}
                          {camelCase(
                            item.announcement_security_name.replace(/_/g, " ")
                          )}{" "}
                        </td>
                        <td>
                          {" "}
                          {camelCase(
                            item.announcement_title.replace(/_/g, " ")
                          )}{" "}
                        </td>
                        <td
                          style={{
                            backgroundColor: item.red_flag_score
                              ? d3.interpolatePurples(item.red_flag_score)
                              : "white",
                          }}
                        >
                          {item.red_flag_score}
                        </td>
                        <td
                          style={{
                            backgroundColor:
                              item.speculative_score != "NA"
                                ? d3.interpolateReds(item.speculative_score)
                                : "white",
                          }}
                        >
                          {item.speculative_score != "NA"
                            ? item.speculative_score
                            : "-"}
                        </td>
                      </tr>
                    ) : null}
                  </>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
