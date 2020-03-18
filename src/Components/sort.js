import React from 'react'

export const locationSort = (a, b) => {
  if (a.location.street.name < b.location.street.name) return -1;
  if (a.location.street.name > b.location.street.name) return 1;
  return 0;
};

export const outcomeSort = (a, b) => {
  if (a["outcome_status"] === null) return 1;
  if (b["outcome_status"] === null) return -1;
  if (a["outcome_status"].category < b["outcome_status"].category) return -1;
  if (a["outcome_status"].category > b["outcome_status"].category) return 1;
  return 0;
};


const SortCrimeResults = ({ sort, totalCrimes }) => 
  <div className="total-crimes">
    <p>Total Crimes { totalCrimes }</p>
    <input
      type="radio"
      name="sort"
      value="location"
      onChange={ () => sort(locationSort) }
    />
    <p>Location Sort</p>
    <input
      type="radio"
      name="sort"
      value="outcome"
      onChange={ () => sort(outcomeSort) }
    />
    <p>Outcome Sort</p>
  </div>

  export default SortCrimeResults