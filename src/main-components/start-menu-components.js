import React from "react";
import { generateYears } from "../js-functions/js-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Slider(props) {
  return (
    <div
      onClick={() => props.showAndHideSliders(props.selector, props.slideClass)}
      className={props.theClass}
    >
      <FontAwesomeIcon icon={props.icon}/>
      <p>{props.label}</p>
    </div>
  );
}

export function PostCode(props) {
  return (
    <div className="postcode-picker">
      <input id="post-code" type="text" placeholder="Location" />
    </div>
  );
}

export function SubmitButton(props) {
  return (
    <div className="submit-button">
      <button
        onClick={() => {
          props.buttonClick();
        }}
      >
        Submit
      </button>
    </div>
  );
}

export const Year = () => {
  return (
    <div className="date-year">
      <span>Year</span>
      <select id="year-select" defaultValue={"2019"}>
        <YearPicker years={generateYears()} />
      </select>
    </div>
  );
};

export const YearPicker = props => {
  return props.years.map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
};

export const Month = () => {
  return (
    <div className="date-month">
      <span>Month</span>
      <select id="month-select">
        <MonthPicker />
      </select>
    </div>
  );
};

export const MonthPicker = () => {
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  return months.map(month => (
    <option key={month} value={month}>
      {month}
    </option>
  ));
};
