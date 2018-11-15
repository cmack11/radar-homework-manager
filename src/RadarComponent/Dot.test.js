import React from 'react';
import Dot from './Dot.js';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  jest.useFakeTimers();
});

const dot = {
  center:{x:10,y:15},
  radius:100,
}

const dotObj = {

}

describe('the initialization of the component', () => {

  it('creates an svg circle with the correct attributes', () => {
    const wrapper = shallow(
      <Dot center={dot.center} radius={dot.radius} dot={dotObj} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('creates a null component because of invalid x prop', () => {
    const wrapper = shallow(
      <Dot center={{x:-50, y:dot.center.y}} radius={dot.radius} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('creates a null component because of invalid y prop', () => {
    const wrapper = shallow(
      <Dot center={{x:dot.center.x, y:-100}} radius={dot.radius} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('creates a null component because of invalid radius prop', () => {
    const wrapper = shallow(
      <Dot center={dot.center} radius={-1} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('initialize the dot to have the minimum opacity', () => {
    let intersectsLine = jest.fn();
    const wrapper = shallow(
      <Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });

})


describe('the fadeIn function', () => {

  it('should fade in by setting the opacity instantly to 1', () => {
    const component = shallow(<Dot center={dot.center} radius={dot.radius} />);
    component.instance().fadeIn()

    expect(component.instance().state.opacity).toEqual(1);
  });

})

describe('the checkIntersect function', () => {

  it('should fill checkIntersect with a reference to the asych function that checks for the spinline to intersect this function', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    
    expect(component.instance().checkIntersect).toBeDefined();
  });

  it('should startToFadeIn after the dot has been intersected by the line', () => {
    let intersectsLine = () => {return true};
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    
    expect(component.instance().checkIntersect).toBeDefined();

    let spy = jest.spyOn(component.instance(),'startFadeIn')
    jest.runOnlyPendingTimers();

    expect(spy).toBeCalled();
  });

});

describe('the restartFadeOut function', () => {

  it('should called fadeOut when restartFadeOut is called', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    const spy = jest.spyOn(component.instance(),'fadeOut');
    
    component.instance().restartFadeOut();
    
    expect(spy).toBeCalled();
  });

})


describe('the startFadeIn function', () => {

  it('should clear the old fadeOut interval', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    component.instance().fOut = {};

    component.instance().startFadeIn();
    
    expect(clearInterval).toBeCalled();
  });

  it('should call the fadeIn function and the startFadeOut function', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    const spy1 = jest.spyOn(component.instance(),'fadeIn');
    const spy2 = jest.spyOn(component.instance(),'startFadeOut');

    component.instance().startFadeIn();
    
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });

  it('should call fadeIn and then call startFadeOut', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    const spy1 = jest.spyOn(component.instance(),'fadeIn');
    const spy2 = jest.spyOn(component.instance(),'startFadeOut');

    component.instance().startFadeIn();
    
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });

})

describe('the startFadeOut function', () => {

  it('should call fade out and set the interval function', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={true} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();
    let spy = jest.spyOn(dotComp,'fadeOut');

    dotComp.startFadeOut();

    expect(spy).toBeCalled();
    expect(setInterval).toBeCalled();
  });

  it('should run the interval function and not clear the function after', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={false} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();
    
    dotComp.startFadeIn = jest.fn();
    jest.clearAllTimers();
    clearInterval.mockReset();

    dotComp.startFadeOut();
    dotComp.state.opacity = dotComp.minOpacity + .1 + dotComp.opacityStep;
    let spy = jest.spyOn(dotComp,'fadeOut');

    jest.runOnlyPendingTimers();

    expect(spy).toBeCalled();
    expect(dotComp.fOut).toEqual(expect.any(Number));
    expect(clearInterval).not.toBeCalled();
  });

  it('should run the interval function and clear the function after', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={false} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();

    dotComp.startFadeIn = jest.fn();
    clearInterval.mockClear();
    dotComp.startFadeOut();
    dotComp.state.opacity = dotComp.minOpacity - .1;
    let spy = jest.spyOn(dotComp,'fadeOut');

    jest.runOnlyPendingTimers();

    expect(spy).toBeCalled();
    expect(clearInterval).toBeCalled();
    expect(dotComp.fOut).toBeNull();
  });

})

describe('the componentWillUnmount function', () => {

  it('should clear both of the intervals', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={false} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();

    clearInterval.mockReset();

    dotComp.checkIntersect = 2;
    dotComp.fOut = 3;

    dotComp.componentWillUnmount();

    expect(clearInterval).toBeCalledTimes(2);
    expect(clearInterval.mock.calls).toEqual([[2],[3]]);
  });

  it('should not clear any of the intervals because they do not currently exist', () => {
    let intersectsLine = jest.fn();
    const component = shallow(<Dot center={dot.center} radius={dot.radius} animateFades={false} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();

    clearInterval.mockReset();

    dotComp.checkIntersect = null;
    dotComp.fOut = null;

    dotComp.componentWillUnmount();

    expect(clearInterval).not.toBeCalled();
  });

})

describe('the onMouseDown function', () => {

  it('should call the prop onMouseDown function', () => {
    let intersectsLine = jest.fn();
    let onMouseDown = jest.fn();
    const component = shallow(<Dot onMouseDown={onMouseDown} dot={dotObj} center={dot.center} radius={dot.radius} animateFades={false} intersectsLine={intersectsLine} />);
    let dotComp = component.instance();
    let e = {};

    dotComp.onMouseDown(e);

    expect(component).toMatchSnapshot();
    expect(onMouseDown).toBeCalledWith(e,dotObj);
  });

})

