import React, { Component } from "react";

export const createListOfFilterCategories = categories =>
  categories.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {};
      acc[curr.category].count = 1;
    } else {
      acc[curr.category].count++;
    }
    return acc;
  }, {});

export class CreateFilterItem extends Component {
  state = {
    checked: false
  };

  categoryRef = React.createRef();

  // If the filter checkbox state changes, 
  // pass the name of the filter to parent components add/remove filter method.  
  handleChecked = () => {
    this.setState(state => (state.checked = !state.checked));
    this.props.addAndRemoveFilters(this.categoryRef.current.id);
  };

  render() {
    const { category, count, totalCrimeCount, index } = this.props;
    return (
      <span
        key={ index }
        id={ category }
        ref={ this.categoryRef }
      >
        <label key={ index + 1 }>
          <input
            key={ index + 2 }
            type="checkbox"
            name={ category }
            defaultChecked={ this.state.checked }
            value={ category }
            onChange={ this.handleChecked }
          />
          <span key={ index + 3 } className="filter-item-wrapper">
            <p key={ index + 4 }>
              { category }
            </p>
            <p key={ index + 5 }>
              { count } Counts
            </p>
            <p key={ index + 6 }>
              { ((count / totalCrimeCount) * 100).toFixed(2) } %
            </p>
          </span>
        </label>
      </span>
    );
  }
}

class FilterCrimeResults extends Component {
  state = {
    currentlyAppliedFilters: []
  };

  remove = filterItem =>
    this.state.currentlyAppliedFilters.filter(item => item !== filterItem);

  add = filterItem => this.state.currentlyAppliedFilters.concat(filterItem);

  // Filter items are passed in from the CreateFilterItem component 
  addAndRemoveFilterItems = filterItem => {
    let currentlyAppliedFilters;
    
    if (this.state.currentlyAppliedFilters.includes(filterItem)) {
      currentlyAppliedFilters = this.remove(filterItem);
    } else {
      currentlyAppliedFilters = this.add(filterItem);
    }

    //Update local filter state and pass list of applied filters to parent 
    this.setState({ currentlyAppliedFilters }, () =>
      this.props.applyFilters(this.state.currentlyAppliedFilters)
    );
  };

  render() {
    const { totalCrimeCount, results } = this.props;
    const filterList = createListOfFilterCategories(results);

      return Object.keys(filterList).map((category, index) => (
            <CreateFilterItem
              key={ index }
              addAndRemoveFilters={ this.addAndRemoveFilterItems }
              index={ index }
              category={ category }
              count={ filterList[category].count }
              totalCrimeCount={ totalCrimeCount }
            />
          )
      );
  }
}

export default FilterCrimeResults;
