import React, { Component } from "react";
import Slider from "./slider";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export const generateYears = () => {
  let newDate = new Date();
  let currentYear = newDate.getFullYear();
  let years = [currentYear];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear - (i + 1));
  }
  return years;
};

const months = [
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

export const Month = ({ handleChange }) => (
  <div className="date-month">
    <span>Month</span>
    <select id="month" onChange={ handleChange }>
      <GenerateOptions optionArray={ months } />
    </select>
  </div>
);

export const Year = ({ handleChange }) => (
  <div className="date-year">
    <span>Year</span>
    <select id="year" defaultValue={ "2019" } onChange={ handleChange }>
      <GenerateOptions optionArray={ generateYears() } />
    </select>
  </div>
);

export const GenerateOptions = ({ optionArray: array }) =>
  array.map((item, index) => (
    <option key={ index } value={ item }>
      { item }
    </option>
  ));

class StartMenu extends Component {
  state = {
    month: "01",
    year: "2019",
    hideStartMenu: false
  };

  locationInputText = React.createRef();

  handleSelectChange = ({ target: { value, id } }) => {
    this.setState((state) => (state[id] = value, state.hideStartMenu = false));
  };

  handleSubmit = () => {
    this.props.submit(
      `${this.locationInputText.current.value} uk`,
      this.state.year,
      this.state.month
    );
    this.setState({ hideStartMenu: true });
  };

  render() {
    return (
      <Slider
        slide={ "side-slide" }
        hide={ "side-hide" }
        label={ "Start" }
        icon={ faPlayCircle }
        manualToggle={ this.state.hideStartMenu }
        stubClassName={ "header-stub" }
      >
        <div className="start-menu-control-wrapper">
          <div className="start-menu-control">
            <div className="start-menu-inputs">
              <input
                id="post-code"
                type="text"
                placeholder="Location"
                ref={ this.locationInputText }
              />
              <Month handleChange={ this.handleSelectChange } />
              <Year handleChange={ this.handleSelectChange } />
            </div>
            <div className="submit-button">
              <button onClick={ this.handleSubmit }>Submit</button>
            </div>
          </div>
        </div>
      </Slider>
    );
  }
}

export default StartMenu
