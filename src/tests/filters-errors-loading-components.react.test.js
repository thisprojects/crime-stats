import React from 'react';
import { 
  Loading,
  Errors,
  Filters,
  MapFilterCategories

} from '../main-components/filters-errors-loading-components';
import {
  mockFilterCategories, 
} from '../tests/mocked-results.js'
import renderer from 'react-test-renderer';

test('Loading Matches Snapshot - loading is true', () => {
  const component = renderer.create(
    <Loading loading={true}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loading Matches Snapshot - loading is false', () => {
  const component = renderer.create(
    <Loading loading={false}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Errors Matches Snapshot - errors is false', () => {
  const component = renderer.create(
    <Errors errors={false}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Errors Matches Snapshot - errors is true', () => {
  const component = renderer.create(
    <Errors errors={true}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Filters Matches Snapshot', () => {
  const component = renderer.create(
    <Filters />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Map Filter Categories Matches Snapshot', () => {
  const component = renderer.create(
    <MapFilterCategories categories={Object.keys(mockFilterCategories)} filterState={mockFilterCategories} totalCrimeCount={"1337"} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});