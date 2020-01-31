import {
  resetFilters,
  postCodeApiCall,
  policeApiCall,
  locationSort,
  outcomeSort,
  makeFilterStates,
  filterResults,
  generateYears,
} from '../js-functions/js-functions.js';

import {
  mockResultString,
  postCodeApiErrorMsg,
  crimeApiError,
  mockFilterState,
  mockFilteredResults,
  mockResults,
  mockFilterCategories,
  mockLocationSortedArray,
  mockOutcomeSortedArray,
  mockedDOM,
} from '../tests/mocked-results.js';

let mockApiResponse = {results: [{
  geometry: {
    location: mockResultString
  }
}]}

let json = () => mockApiResponse;

global.fetch = () => {
  return new Promise ((res,rej) => {
    return res({
      json
    })
  })
}

document.body.innerHTML = mockedDOM;

test('Reset Filters', () => {
  resetFilters();
  let x = document.querySelector('input');
  expect(x.checked).toEqual(false);
});

test('Post Code APi Call Valid Results', async () => {
  let x =  await postCodeApiCall()
  expect(x).toEqual(mockResultString);
});

test('Post Code APi Call Invalid Results', async () => {
  mockApiResponse = "foobar"

  let x =  await postCodeApiCall()
  expect(x).toEqual(postCodeApiErrorMsg);
});

test ('Police APi call Valid Results', async () => {
  let x = await policeApiCall()
  expect(x).toEqual(mockApiResponse) 
})

test ('Police APi call Invalid Results', async () => {
  json = "foobar"

  let x = await policeApiCall()
  expect(x).toEqual(crimeApiError) 
})

test ('Location Sort', () => {
  let x = mockResults.sort(locationSort);
  expect(x).toEqual(mockLocationSortedArray);
});

test ('Outcome Sort', () => {
  let x = mockResults.sort(outcomeSort);
  expect(x).toEqual(mockOutcomeSortedArray);
});

test ('Filter Results', () => {
  let x = filterResults (mockFilterState , mockResults)
  expect(x).toEqual(mockFilteredResults);
});

test ('Make Filter States', () => {
  let x = makeFilterStates (mockResults)
  expect(x).toEqual(mockFilterCategories)
});

test('Generate years returns array of last 3 years', () => {
  let x = generateYears();
  let newDate= new Date()
  let year = newDate.getFullYear();
  expect(x).toContain(year, year -1, year -2);
});