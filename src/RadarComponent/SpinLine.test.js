import React from 'react';
import SpinLine from './SpinLine.js';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  jest.useFakeTimers();
});

const line = {
  center:{x:10,y:15},
  length:100,
}

const setLineAngle = function() {

}

describe('initialization', () => {

  it('should initialize the SpinLine', () => {
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should initialize a null SpinLine', () => {
    const wrapper = shallow(
      <SpinLine setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should set an interval to update the coordinates of the spinLine', () => {
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    expect(wrapper.instance().spinInterval).toBeDefined();
    expect(setInterval).toBeCalled();
    expect(setInterval).toBeCalledWith(expect.any(Function),50);

  });

  it('should fill the setLineAngle props function', () => {
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    expect(wrapper.instance().props.setLineAngle).toBeDefined();
    expect(wrapper.instance().props.setLineAngle).toEqual(setLineAngle);
  });

  it('should set an angle to start on', () => {
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    expect(wrapper.instance().state.angle).toEqual(0);
  });

})

describe('interval function', () => {

  it('should call the setLineAngle function', () => {
    const setLineAngle = jest.fn();
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );
    expect(setLineAngle).not.toBeCalled();

    jest.runOnlyPendingTimers();
    let newAngle = wrapper.instance().state.angle;

    expect(setLineAngle).toBeCalled();
    expect(setLineAngle).toBeCalledWith(newAngle);
  });

  it('should increase the angle of the line', () => {
    const setLineAngle = jest.fn();
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    let angle = wrapper.instance().state.angle;

    jest.runOnlyPendingTimers();

    expect(wrapper.instance().state.angle).toBeGreaterThan(angle);
  });

  it('should reset the angle of the line to zero', () => {
    const setLineAngle = jest.fn();
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );

    wrapper.instance().state.angle = 359.9;

    jest.runOnlyPendingTimers();

    expect(wrapper.instance().state.angle).toEqual(0);
  });

})

describe('tear down of component', () => {

  it('should clear the spinline interval', () => {
    const wrapper = shallow(
      <SpinLine show setLineAngle={setLineAngle} rpm="6" radius={line.length} center={line.center} />,
    );
    let spy = jest.spyOn(wrapper.instance(), 'componentWillUnmount')

    wrapper.instance().componentWillUnmount();

    expect(spy).toBeCalled();
    expect(clearInterval).toBeCalled();
  });

})




