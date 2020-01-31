import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  Filters,
  Errors,
  Loading
} from "./main-components/filters-errors-loading-components";
import {
  PostCode,
  Year,
  Month,
  Slider,
  SubmitButton
} from "./main-components/start-menu-components";
import {
  postCodeApiCall,
  policeApiCall,
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
  constructor(props) {
    super(props);
    this.state = {
      lat: 1,
      lng: 52,
      crimeResults: [],
      filteredResults: [],
      filterState: {},
      errorState: null,
      loadingState: null
    };
  }

  setResults = (results, errors, loading) => {
    this.setState({
      crimeResults: results,
      filteredResults: results,
      filterState: makeFilterStates(results),
      errorState: errors || null,
      loadingState: loading || null
    });
  };

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

  async callCrimeApi(locationSetByDrag) {
    let results = await policeApiCall(this.state.lat, this.state.lng);

    //If a results array is returned, display the results. If not, display errors.
    Array.isArray(results)
      ? this.setResults(results, null, false)
      : this.setResults([], results, false);
    resetFilters();
    this.setFilterListeners();
    if (!locationSetByDrag)
      this.showAndHideSliders("#header-wrapper", "side-hide");
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
    this.setState({
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng(),
      loadingState: true
    });
    this.callCrimeApi(true);
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

  render() {
    const submitButton = async () => {
      let location = await postCodeApiCall();

      // If a valid location is returned, set lat and lng then call crime API. If location is invalid, display errors.
      if (location.lat && location.lng) {
        this.setState({
          lat: location.lat,
          lng: location.lng,
          loadingState: true
        });
        this.callCrimeApi();
      } else {
        this.setResults([], location);
      }
    };

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
              <PostCode />
              <Month />
              <Year />
            </div>
            <SubmitButton buttonClick={submitButton} />
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
        <div
          className="errors-wrapper"
          style={
            this.state.errorState ? { display: "flex" } : { display: "none" }
          }
        >
          <Errors errors={this.state.errorState} />
        </div>
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
  apiKey: key
})(CrimeApp);
