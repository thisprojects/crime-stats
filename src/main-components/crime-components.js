import React from "react";

export function MapCrimeResults(props) {
  if (props.results.length > 0) {
    return props.results.map((results, index) => (
      <div key={index} className="stat-row">
        <span className="result-category">{results.category}</span>
        <span className="result-location">{results.location.street.name}</span>
        <span className="result-outcome">
          {results["outcome_status"] !== null
            ? results["outcome_status"].category
            : "No Outcome Recorded"}
        </span>
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
}

export const SortCrimes = props => {
  return (
    <div className="total-crimes">
      <p>Total Crimes {props.totalCrimes}</p>
      <input
        type="radio"
        name="sort"
        value="location"
        onChange={() => props.locationSort()}
      />
      <p>Location Sort</p>
      <input
        type="radio"
        name="sort"
        value="outcome"
        onChange={() => props.outcomeSort()}
      />
      <p>Outcome Sort</p>
    </div>
  );
};

export function CrimeStats(props) {
  return (
    <div className="crime-stats">
      <SortCrimes
        totalCrimes={props.results.length}
        locationSort={props.applyLocationSort}
        outcomeSort={props.applyOutcomeSort}
      />
      <div className="results-table">
        <MapCrimeResults results={props.results} />
      </div>
    </div>
  );
}
export default CrimeStats;
