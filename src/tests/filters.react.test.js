import React from 'react';
import {createListOfFilterCategories, CreateFilterItem } from './../Components/filters'
import {
  mockResults, 
} from './mocked-results.js'
import renderer from 'react-test-renderer';


test('Filters Matches Snapshot', () => {
  const component = renderer.create(
    <CreateFilterItem
      key={ 1 }
      addAndRemoveFilters={ () => {} }
      index={ 1 }
      category={ 'fake-cat'}
      count={ 1 }
      totalCrimeCount={ '1337' }
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create filter list function output as expected', () => {
  let x = createListOfFilterCategories(mockResults)
  console.log(x)
  expect(x).toEqual(   {
    'ccc Mock Category 1': { count: 1 },
    'bbb Mock Category 2': { count: 1 },
    'aaa Mock Category 3': { count: 1 }
  });
});