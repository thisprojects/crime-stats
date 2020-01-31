import React from 'react';
import renderer from 'react-test-renderer';
import {
  MapCrimeResults,
  SortCrimes,
  CrimeStats,
} from '../main-components/crime-components.js';
import {
  mockResults
} from '../tests/mocked-results.js';


test('Map Crime Results Matches Snapshot', () => {
  const component = renderer.create(
    <MapCrimeResults results={mockResults} applyLocationSort={()=>{}} applyOutcomeSort={()=>{}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sort Crimes Matches Snapshot', () => {
  const component = renderer.create(
    <SortCrimes totalCrimes={"1337"} locationSort={()=>{}} outcomeSort={()=>{}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Crime Stats Matches Snapshot', () => {
  const component = renderer.create(
    <CrimeStats results={mockResults} applyLocationSort={()=>{}} applyOutcomeSort={()=>{}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});