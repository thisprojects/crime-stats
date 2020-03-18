import React from 'react';
import StartMenu , {generateYears, GenerateOptions, Year, Month } from './../Components/start-menu'
import renderer from 'react-test-renderer';

test("Start Menu matches snapshot", () => {
  const component = renderer.create(
    <StartMenu
      handleChange={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Generate years returns array of last 3 years', () => {
  let x = generateYears();
  let newDate= new Date()
  let year = newDate.getFullYear();
  expect(x).toContain(year, year -1, year -2);
});

test("Generate Options matches snapshot", () => {
  const component = renderer.create(
    <GenerateOptions
    optionArray={ generateYears() }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Year matches snapshot", () => {
  const component = renderer.create(
    <Year
      handleChange={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Month matches snapshot", () => {
  const component = renderer.create(
    <Month
      handleChange={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

