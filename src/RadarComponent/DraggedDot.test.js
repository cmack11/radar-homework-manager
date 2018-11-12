import React from 'react';
import DraggedDot from './DraggedDot.js';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  jest.useFakeTimers();
});

const dot = {
  dot:{}
}

const intersectFunctions = [
  {
    rect:{x:0,y:0,width:20,height:20},
    func:()=>{}
  },
  {
    rect:{x:50,y:5,width:100,height:10},
    func:()=>{}
  }
]



describe('initialization', () => {

  it('should initialize a DraggedDot', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should initialize a null DraggedDot', () => {
    const wrapper = shallow(
      <DraggedDot />,
    );

    expect(wrapper).toMatchSnapshot();
  });
})


describe('componentWillReceiveProps', () => {

  it('should receive a new dot and update the state', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let mock = function(attr) {return 'color'};
    let draggedDot = wrapper.instance();
    let newProps = {dot:{dot:{getAttribute:mock}}};
    let attrSpy = jest.spyOn(newProps.dot.dot,'getAttribute');
    let stateSpy = jest.spyOn(draggedDot,'setState');
    let windowSpy = jest.spyOn(window,'addEventListener')


    draggedDot.componentWillReceiveProps(newProps);

    expect(attrSpy).toBeCalledWith('fill');
    expect(stateSpy).toBeCalledWith({fill:mock()});
    expect(windowSpy).toBeCalledTimes(2);
    expect(windowSpy.mock.calls).toEqual([['mousemove',draggedDot.mouseMove],['mouseup',draggedDot.mouseUp]]);

    
  });

  it('should not recieve a new dot and record the old dot', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    let newProps = {dot:null};


    draggedDot.componentWillReceiveProps(newProps);

    expect(draggedDot.oldDot).toEqual(dot);
    
  });

  it('should not recieve a new dot and do nothing', () => {
    const wrapper = shallow(
      <DraggedDot  />,
    );
    let draggedDot = wrapper.instance();
    let newProps = {dot:null};

    draggedDot.componentWillReceiveProps(newProps);

    expect(draggedDot.oldDot).not.toBeDefined();
    
  });

})

describe('mouseUp', () => {

  it('should remove the drag functions and set the state to negative', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    draggedDot.checkIntersectFunctions = jest.fn();
    let windowSpy = jest.spyOn(window,'removeEventListener')
    let stateSpy = jest.spyOn(draggedDot,'setState')

    draggedDot.mouseUp({})

    expect(draggedDot.checkIntersectFunctions).toBeCalled();
    expect(windowSpy.mock.calls).toEqual([['mouseup',draggedDot.mouseUp],['mousemove',draggedDot.mouseMove]]);
    expect(stateSpy).toBeCalledWith({point:{x:-1,y:-1}})

  });

})

describe('checkIntersectFunctions', () => {

  it('should do nothing and have no errors because there are no functions to check', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    let x = 5, y = 5;

    draggedDot.checkIntersectFunctions(x,y) 
  });

  it('should go through the intersect functions but do nothing because they are missing necessary fields', () => {
    let intersectFuncs = [{rect:{}},{func:{}}]
    const wrapper = shallow(
      <DraggedDot dot={dot} intersectFunctions={intersectFuncs}/>,
    );
    let draggedDot = wrapper.instance();
    let x = 5, y = 5;

    draggedDot.checkIntersectFunctions(x,y) 

  });

  it('should run the first intersect function but not the second', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} intersectFunctions={intersectFunctions}/>,
    );
    let draggedDot = wrapper.instance();
    let x = 5, y = 5;
    intersectFunctions.map((obj) => {
      obj.func = jest.fn();
    })

    draggedDot.checkIntersectFunctions(x,y) 

    expect(intersectFunctions[0].func).toBeCalled(draggedDot.oldDot);
    expect(intersectFunctions[1].func).not.toBeCalled();
  });

  it('should run the second intersect function but not the first', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} intersectFunctions={intersectFunctions}/>,
    );
    let draggedDot = wrapper.instance();
    let x = 105, y = 10;
    intersectFunctions.map((obj) => {
      obj.func = jest.fn();
    })

    draggedDot.checkIntersectFunctions(x,y) 

    expect(intersectFunctions[0].func).not.toBeCalled();
    expect(intersectFunctions[1].func).toBeCalledWith(draggedDot.oldDot);
  });

})

describe('pauseEvent', () => {

  it('should modify the event object and call 2 functions that are defined', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    let event = {stopPropagation:jest.fn(), preventDefault:jest.fn()};

    let returnValue = draggedDot.pauseEvent(event);

    expect(returnValue).toBeFalsy();
    expect(event.stopPropagation).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(event.cancelBubble).toBeTruthy();
    expect(event.returnValue).toBeFalsy();
  });

  it('should modify the event object', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    let event = {};

    let returnValue = draggedDot.pauseEvent(event);

    expect(returnValue).toBeFalsy();
    expect(event.cancelBubble).toBeTruthy();
    expect(event.returnValue).toBeFalsy();
  });

})

describe('mouseMove', () => {

  it('should ', () => {
    const wrapper = shallow(
      <DraggedDot dot={dot} />,
    );
    let draggedDot = wrapper.instance();
    let event = {clientX:100,clientY:200};
    let func = jest.fn();
    draggedDot.pauseEvent = jest.fn();
    document.getElementById = function(arg) { return {
      insertBefore:func,
      getBoundingClientRect:()=>{return {height:20}}
    } }
    window.getComputedStyle = ()=>{return {getPropertyValue:()=>{return 10;}}}
    let documentSpy = jest.spyOn(document,'getElementById');
    let stateSpy = jest.spyOn(draggedDot,'setState')

    draggedDot.mouseMove(event);

    expect(draggedDot.pauseEvent).toBeCalledWith(event);
    expect(func).toBeCalledWith(dot.dot,null);
    expect(documentSpy.mock.calls).toEqual([['dotsGroup'],['radarScreen']])
    expect(stateSpy).toBeCalledWith({point:{x:event.clientX,y:event.clientY-20-10}})
  });

  

})

