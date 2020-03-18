import React from "react";
import renderer from "react-test-renderer";
import ResultsUi from "../Components/results-ui";
import SortCrimes from "../Components/sort";
import FilterCrimes from "../Components/filters";
import { mockResults } from "./mocked-results.js";

test("Results Ui Matches Snapshot", () => {
  const component = renderer.create(
    <ResultsUi
      results={ mockResults }
      applyLocationSort={() => {}}
      applyOutcomeSort={() => {}}
      key={ mockResults }
      defaultFilter={ [] }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Sort Crimes Matches Snapshot", () => {
  const component = renderer.create(
    <SortCrimes
    totalCrimes={ '1337' } sort={ ()=>{}} 
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Crime Stats Matches Snapshot", () => {
  const component = renderer.create(
    <FilterCrimes
      results={mockResults}
      totalCrimeCount={ '1337' }
      applyFilters={ () => {} }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
