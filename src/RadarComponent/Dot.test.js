import React from 'react';
import Dot from './Dot.js';
import renderer from 'react-test-renderer';

const dot = {
  center:{x:10,y:15},
  radius:100,
}

it('creates an svg circle with the correct attributes', () => {
  const component = renderer.create(
    <Dot center={dot.center} radius={dot.radius} />,
  );

  let dotObj = component.toJSON();

  expect(dotObj.props.cx).toEqual(dot.center.x)
  expect(dotObj.props.cy).toEqual(dot.center.y)
  expect(dotObj.props.r).toEqual(dot.radius)

});

it('creates a null component because of invalid x prop', () => {
  const component = renderer.create(
    <Dot center={{x:-50, y:dot.center.y}} radius={dot.radius} />,
  );

  let dotObj = component.toJSON();
  console.log(dotObj)

  expect(dotObj).toBeNull()
});

it('creates a null component because of invalid y prop', () => {
  const component = renderer.create(
    <Dot center={{x:dot.center.x, y:-100}} radius={dot.radius} />,
  );

  let dotObj = component.toJSON();
  console.log(dotObj)

  expect(dotObj).toBeNull()
});

it('creates a null component because of invalid radius prop', () => {
  const component = renderer.create(
    <Dot center={dot.center} radius={-1} />,
  );

  let dotObj = component.toJSON();
  console.log(dotObj)

  expect(dotObj).toBeNull()
});