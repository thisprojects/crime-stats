export const key ='Obscured';

export const resetFilters = () => {
  let y = document.querySelectorAll(".filter-container input");
  for (let i = 0; i < y.length; i++) {
    y[i].checked = false;
  }
};

export const postCodeApiCall = () => {
  let postCode = document.querySelector("#post-code").value;
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode},uk&key=${key}`
  )
    .then(r => r.json())
    .then(r => r.results[0].geometry.location)
    .catch(e => {
      console.log("Location API Error - Invalid Location ----->", e);
      return "Location Error - Location is invalid. Remember only UK locations will return results.";
    });
};

export const policeApiCall = (lat, lng) => {
  let year = document.querySelector("#year-select").value;
  let month = document.querySelector("#month-select").value;
  return fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${year}-${month}`
  )
    .then(r => r.json())
    .catch(e => {
      console.log("Police API Error - Caught Error Is ----->", e);
      return "Crime API Error - Try an earlier month.";
    });
};

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

export const makeFilterStates = categories => {
  return categories.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {};
      acc[curr.category].state = false;
      acc[curr.category].count = 1;
    } else {
      acc[curr.category].count++;
    }
    return acc;
  }, {});
};

export const filterResults = (filterState, results) => {
  let x = Object.keys(filterState);
  let z = [];
  x.forEach(filterItem => {
    if (filterState[filterItem].state === true) {
      z.push(...results.filter(item => item.category === filterItem));
    }
  });
  return z.length > 0 ? z : results;
};

export const generateYears = () => {
  let newDate = new Date();
  let currentYear = newDate.getFullYear();
  let years = [currentYear];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear - (i + 1));
  }
  return years;
};
