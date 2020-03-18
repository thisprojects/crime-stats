import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import StartMenu from "./Components/start-menu";
import getData from "./utils/networkRequests";
import ResultsUI from "./Components/results-ui";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "./pointer.png";
import "./Scss/root.scss";

export const Loading = ({ loading }) =>
  loading && (
    <div className="show-loading">
      <h1>LOADING</h1>
      <FontAwesomeIcon icon={ faSpinner } size="3x" spin />
      <p>Major cities may take some time.</p>
    </div>
  );

export const Errors = ({ errors }) =>
  errors && (
    <div className="errors-wrapper">
      <p>
        Whoops! Something went wrong. Only UK locations are supported. If this
        problem persists please try again later.
      </p>
    </div>
  );

export class CrimeApp extends Component {
  state = {
    lat: 1,
    lng: 52,
    crimeResults: [],
    errorState: null,
    loadingState: null
  };

  //Get results from dragged map marker location
  onMarkerDragEnd(evt) {
    const location = `${ evt.latLng.lat()} ${evt.latLng.lng() }`;
    this.fetchCrimeResults(location);
  }

  fetchCrimeResults = async (location, year = this.state.year, month = this.state.month) => {
    this.setState({ loadingState: true, errorState: false });

    let x = await getData(location, month, year).catch(() =>
      this.setState({ errorState: true })
    );

    const { lat, lng, results = {} } = x || {};
    if (!this.state.errorState) {
      this.setState({
        year: year,
        month: month,
        lat: lat,
        lng: lng,
        crimeResults: results
      });
    }

    this.setState({ loadingState: false });
  };

  render() {
    const { loadingState, lat, lng, errorState, crimeResults } = this.state;

    return (
      <div>
        <Loading loading={ loadingState } />
        <StartMenu submit={ this.fetchCrimeResults } />
        <div className="map">
          <Map
            initialCenter={{
              lat: 52.489471,
              lng: -1.898575
            }}
            center={{
              lat,
              lng
            }}
            google={ this.props.google }
            zoom={ 13 }
          >
            <Marker
              icon={ icon }
              position={{ lat, lng }}
              draggable={ true }
              onDragend={ (map, t, coord) => this.onMarkerDragEnd(coord) }
              name={ "Current location" } 
            />
          </Map>
        </div>
        <Errors errors={ errorState } />
        <ResultsUI
          key={ crimeResults }
          defaultFilter={ [] }
          results={ crimeResults }
          applyLocationSort={ this.applyLocationSort }
          applyOutcomeSort={ this.applyOutcomeSort }
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCyNv5BOZZfdKO3VDhQCOA3Ufm8tv8rCF8"
})(CrimeApp);
