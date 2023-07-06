import React, { useState, useEffect } from "react";
import axios from "axios";

import "./css/SearchBar.css"; // Import the CSS file

const SearchBar = ({ onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (isActive == false) setIsActive(true);
    else setIsActive(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    axios
      .get("https://twelve-data1.p.rapidapi.com/stocks", {
        params: {
          exchange: "NASDAQ",
          format: "json",
        },
        headers: {
          "x-rapidapi-key":
            "a05b98e360msh5b5a6eb1199a407p1d400djsnb2be05f4c091",
          "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
        },
      })
      .then((response) => {
        setCompanies(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    onCompanySelect(company.symbol);
  };

  const getNearestMatches = (matches, limit = 5) => {
    return matches.slice(0, limit);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const nearestMatches = getNearestMatches(filteredCompanies);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
        onClick={handleClick}
        placeholder="Search Stocks"
      />

      {nearestMatches.length > 0 && isActive && (
        <div className="search-results">
          <ul>
            {nearestMatches.map((company) => (
              <li
                key={company.symbol}
                onClick={() => {
                  handleSelectCompany(company);
                  handleClick();
                }}
              >
                {company.name} ({company.symbol})
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCompany && (
        <>
          <p style={{ color: "#8884d8" }}>
            {selectedCompany.name}, {selectedCompany.symbol},{" "}
            {selectedCompany.exchange}
          </p>
        </>
      )}
    </div>
  );
};

export default SearchBar;
