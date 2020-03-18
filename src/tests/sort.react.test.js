import { locationSort, outcomeSort } from './../Components/sort'
import {
  mockResults,
  mockLocationSortedArray,
  mockOutcomeSortedArray
} from './mocked-results.js'

test('Check location sort output as expected', () => {
  let x = mockResults.sort(locationSort)
  expect(x).toEqual(mockLocationSortedArray);
});

test('Check outcome sort output as expected', () => {
  let x = mockResults.sort(outcomeSort)
  expect(x).toEqual(mockOutcomeSortedArray);
});