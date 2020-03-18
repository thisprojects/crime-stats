import React from "react";

const ResultItems = ({ result }) => (
  <React.Fragment>
    <span className="result-item">{ result.category }</span>
    <span className="result-item">{ result.location.street.name }</span>
    <span className="result-item">
      { (result["outcome_status"] && result["outcome_status"].category) ||
        "No Outcome Recorded" }
    </span>
  </React.Fragment>
);

const MapCrimeResults = ({ results }) => {
  if (results.length > 0) {
    return results.map((result, index) => (
      <div key={ index } className="stat-row">
        <ResultItems result={ result } />
      </div>
    ));
  } else {
    return (
      <div className="no-results">
        <p>
          No Results - Click start to choose a location. Results are only
          available for UK locations
        </p>
      </div>
    );
  }
};

export default MapCrimeResults;
