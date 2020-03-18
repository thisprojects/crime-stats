import getData from '../utils/networkRequests'

import {
  mockGetDataResult, 
} from './mocked-results.js';

let mockApiResponse = {

  results: [{
  geometry: {
    location: {
      lat: 1,
      lng: 2
    }
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

test('getData returns expected results', async () => {
  let x =  await getData('location', 'month', 'year')
  console.log(x)
  expect(x).toEqual(mockGetDataResult);
});



// test('Generate years returns array of last 3 years', () => {
//   let x = generateYears();
//   let newDate= new Date()
//   let year = newDate.getFullYear();
//   expect(x).toContain(year, year -1, year -2);
// });