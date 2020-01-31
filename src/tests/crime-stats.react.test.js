import React from 'react';
import { CrimeApp } from '../crime-stats.js';
import renderer from 'react-test-renderer';

test('Main Component Matches Snapshot', () => {
  const component = renderer.create(
    <CrimeApp />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



