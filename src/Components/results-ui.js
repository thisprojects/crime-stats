import React, { Component } from "react";
import FilterCrimeResults from "./filters";
import SortCrimeResults from "./sort";
import Slider from "./slider";
import MapCrimeResults from "./map-crime-results"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter} from "@fortawesome/free-solid-svg-icons";



export class ResultsUI extends Component {
  state = {
    filteredAndSortedResults: this.props.defaultFilter,
    hideFilters: true
  };

  // Recieve active filters array from FilterCrimeResultss component and apply filters to results
  applyFilters = listOfActiveFilters => {
    this.setState(
      state =>
        (state.filteredAndSortedResults = this.props.results.filter(item =>
          listOfActiveFilters.includes(item.category)
        ))
    );
  };

  // Receive sortType from SortCrimeResults component and apply sort to results.
  sort = sortType => {
    if (this.state.filteredAndSortedResults.length > 0) {
      this.setState({
        filteredAndSortedResults: this.state.filteredAndSortedResults.sort(
          sortType
        )
      });
    } else {
      this.setState({
        filteredAndSortedResults: this.props.results.sort(sortType)
      });
    }
  };

  toggleFilterMenu = () => {
    this.setState(state => (state.hideFilters = !state.hideFilters));
  };

  render() {
    const { results } = this.props;
    const { filteredAndSortedResults } = this.state;
    
    return (
      <div className="crime-stats-wrapper">
        <div className="crime-stats">
          <SortCrimeResults totalCrimes={ results.length } sort={ this.sort } />
          <div className="results-table">
            <MapCrimeResults
              results={
                filteredAndSortedResults.length
                  ? filteredAndSortedResults
                  : results
              }
            />
          </div>
          <div className="filter-stub" onClick={ this.toggleFilterMenu }>
            <p>Filter</p>
            <FontAwesomeIcon icon={ faFilter } />
          </div>
          <Slider
            slide={ "top-slide" }
            hide={ "top-hide" }
            manualToggle={ this.state.hideFilters }
          >
            <div className="filter-wrapper">
              <FilterCrimeResults
                results={ results }
                totalCrimeCount={ results.length }
                applyFilters={ this.applyFilters }
              />
            </div>
          </Slider>
          ;
        </div>
      </div>
    );
  }
}

export default ResultsUI;
