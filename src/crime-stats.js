import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  Filters,
  Errors,
  Loading
} from "./main-components/filters-errors-loading-components";
import { Year, Month, Slider } from "./main-components/start-menu-components";
import {
  getData,
  makeFilterStates,
  resetFilters,
  filterResults,
  locationSort,
  outcomeSort,
  key
} from "./js-functions/js-functions";
import CrimeStats from "./main-components/crime-components.js";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import icon from "./pointer.png";

export class CrimeApp extends Component {
  state = {
    lat: 1,
    lng: 52,
    crimeResults: [],
    filteredResults: [],
    filterState: {},
    errorState: null,
    loadingState: null
  };

  locationInputText = React.createRef();

  setFilterListeners() {
    let x = document.querySelectorAll(".filter-container input");
    for (let i = 0; i < x.length; i++) {
      // Keep filter checkbox value and filter states in sync
      if (
        x[i].checked === true &&
        this.state.filterState[x[i].name.state] === false
      ) {
        this.state.filterState[x[i].name].state = true;
        this.applyFilters();
      }

      // Listen for filter element clicks
      x[i].addEventListener("click", e => {
        let t = e.target;
        this.state.filterState[t.name].state = t.checked;
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    this.setState({
      filteredResults: filterResults(
        this.state.filterState,
        this.state.crimeResults
      )
    });
  }

  onMarkerDragEnd(evt) {
    const dragLat = evt.latLng.lat();
    const dragLng = evt.latLng.lng();
    const locationSetByDrag = true;
    this.submitButton({ locationSetByDrag, dragLat, dragLng });
  }

  showAndHideSliders = (selector, slideClass) => {
    let x = document.querySelector(selector);
    x.classList.toggle(slideClass);
  };

  applyLocationSort = () => {
    this.setState({
      filteredResults: this.state.filteredResults.sort(locationSort)
    });
  };

  applyOutcomeSort = () => {
    this.setState({
      filteredResults: this.state.filteredResults.sort(outcomeSort)
    });
  };

  submitButton = async ({ locationSetByDrag, dragLat, dragLng } = {}) => {
    const location = locationSetByDrag
      ? `${dragLat} ${dragLng}`
      : this.locationInputText.current.value;
    this.setState({ loadingState: true, errorState: false });
    let x = await getData(location).catch( () => this.setState({ errorState: true }))
    const { lat, lng, results = {} } = x || {}
    if (!this.state.errorState) {
      this.setState({
        lat: lat,
        lng: lng,
        crimeResults: results,
        filteredResults: results,
        filterState: makeFilterStates(results),
      });
      resetFilters();
      this.setFilterListeners();
    }
    if (!locationSetByDrag) this.showAndHideSliders("#header-wrapper", "side-hide");
    this.setState({ loadingState: false })
  };

  render() {
    return (
      <div id="page-wrapper">
        <Loading loading={this.state.loadingState} />
        <div id="header-wrapper" className="side-slide side-hide">
          <Slider
            showAndHideSliders={this.showAndHideSliders}
            selector={"#header-wrapper"}
            theClass={"header-stub"}
            label={"Start"}
            slideClass={"side-hide"}
            icon={faPlayCircle}
          />
          <div className="header-active">
            <div className="start-menu-inputs">
              <input
                id="post-code"
                type="text"
                placeholder="Location"
                ref={this.locationInputText}
              />
              <Month />
              <Year />
            </div>
            <div className="submit-button">
              <button onClick={this.submitButton}>Submit</button>
            </div>
          </div>
        </div>
        <div id="map" className="map">
          <Map
            initialCenter={{
              lat: 52.489471,
              lng: -1.898575
            }}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            google={this.props.google}
            zoom={13}
          >
            <Marker
              icon={icon}
              position={{ lat: this.state.lat, lng: this.state.lng }}
              draggable={true}
              onDragend={(map, t, coord) => this.onMarkerDragEnd(coord)}
              name={"Current location"}
            />
          </Map>
        </div>
        <div className="filter-wrapper top-slide top-hide">
          <Filters
            filterState={this.state.filterState}
            totalCrimeCount={this.state.crimeResults.length}
          />
        </div>
        <Slider
          showAndHideSliders={this.showAndHideSliders}
          selector={".filter-wrapper"}
          theClass={"filter-stub"}
          label={"Filters"}
          slideClass={"top-hide"}
          icon={faFilter}
        />
        <Errors errors={this.state.errorState} />
        <div className="crime-stats-wrapper">
          <CrimeStats
            results={this.state.filteredResults}
            applyLocationSort={this.applyLocationSort}
            applyOutcomeSort={this.applyOutcomeSort}
          />
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ""
})(CrimeApp);
