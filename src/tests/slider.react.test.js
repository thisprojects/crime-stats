import React from "react";
import Slider from "../Components/slider";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import renderer from "react-test-renderer";

test("Slider Matches Snapshot - manual toggle true", () => {
  const component = renderer.create(
    <Slider
    slide={ "side-slide" }
    hide={ "side-hide" }
    label={ "Start" }
    icon={ faPlayCircle }
    manualToggle={ true }
    stubClassName={ "header-stub" }
    >
      <p>Test</p>
    </Slider>  
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test("Slider Matches Snapshot - manual toggle false", () => {
  const component = renderer.create(
    <Slider
    slide={ "side-slide" }
    hide={ "side-hide" }
    label={ "Start" }
    icon={ faPlayCircle }
    manualToggle={ false }
    stubClassName={ "header-stub" }
    >
      <p>Test</p>
    </Slider>  
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
