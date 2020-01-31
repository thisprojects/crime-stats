import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Loading(props) {
  return (
    <div
      id="loading"
      className={props.loading ? "show-loading" : "hide-loading"}
    >
      <h1>LOADING</h1>
      <FontAwesomeIcon icon={faSpinner} size="3x" spin />
      <p>Major cities may take some time.</p>
    </div>
  );
}

export function Errors(props) {
  return (
    <div style={!props.errors ? { display: "none" } : {}}>
      <h3>{props.errors}</h3>
    </div>
  );
}

export function Filters(props) {
  if (props.filterState) {
    return (
      <div className="filters">
        <MapFilterCategories
          categories={Object.keys(props.filterState)}
          filterState={props.filterState}
          totalCrimeCount={props.totalCrimeCount}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>Nothing To Filter</p>
      </div>
    );
  }
}

export function MapFilterCategories(props) {
  return props.categories.map((category, index) => (
    <span key={index} className="filter-container">
      <label key={index + 1}>
        <input
          key={index + 2}
          type="checkbox"
          name={category}
          value={category}
        />
        <span key={index + 3} className="filter-item-wrapper">
          <p key={index + 4} className="category-header">
            {category}
          </p>
          <p key={index + 5} className="category-count">
            {props.filterState[category].count} Counts{" "}
          </p>
          <p key={index + 6} className="category-percentage">
            (
            {(
              (props.filterState[category].count / props.totalCrimeCount) *
              100
            ).toFixed(2)}{" "}
            %)
          </p>
        </span>
      </label>
    </span>
  ));
}
