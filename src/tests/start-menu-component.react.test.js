import React from 'react';
import { 
  PostCode,
  Slider,
  SubmitButton,
  Year,
  YearPicker,
  Month,
  MonthPicker 
} from '../main-components/start-menu-components.js';

import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import renderer from 'react-test-renderer';


test('PostCode Matches Snapshot', () => {
  const component = renderer.create(
    <PostCode />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Slider Matches Snapshot', () => {
  const component = renderer.create(
    <Slider showAndHideSliders={"stub"} selector={"#header-wrapper"} theClass={"header-stub"} label={"Start"} slideClass={"side-hide"} icon={faPlayCircle}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SubmitButton Matches Snapshot', () => {
  const component = renderer.create(
    <SubmitButton />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Year Matches Snapshot', () => {
  const component = renderer.create(
    <Year />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('YearPicker Matches Snapshot', () => {
  const component = renderer.create(
    <YearPicker years={["1","2","3","4","5"]} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Month Matches Snapshot', () => {
  const component = renderer.create(
    <Month />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MonthPicker Matches Snapshot', () => {
  const component = renderer.create(
    <MonthPicker />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

