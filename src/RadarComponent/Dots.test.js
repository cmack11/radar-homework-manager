import React from 'react';
import {Dots} from './Dots.js';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {subjects1} from '../fakeData.js';
import moment from 'moment'

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  jest.useFakeTimers();
});

const subjects = [
  {
    name:'Subject #1',
    color:'red',
    assignments:[
      {
        name:"Assignment #1",
        type:"Problem Set",
        dueDate:moment('2018-09-12 12:00:00.000'),
      subject:"Subject #1",
      },{
        name:"Assignment #2",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
        subject:"Subject #1",
      }
    ]
  },
  {
    name:'Subject #2',
    color:'blue',
    assignments:[]
  }
]

const getDistanceFromCenter = function() {return 1};
const view = {}
const dims = {};

const dotObj = {

}

/*<Dots  subjects={this.state.subjects} 
          getDistanceFromCenter={this.getDistanceFromCenter.bind(this)} 
          view={this.state.view} dims={this.view} //bad
          intersectFunctions={intersectFuncs}
          intersectsLine={this.intersectsLine.bind(this)}
          setClickedDot={this.setClickedDot.bind(this)}
          setDraggedDot={this.setDraggedDot.bind(this)}/>,*/

describe('the initialization of the component', () => {

  it('creates layer of dots', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('creates an empty dot layer', () => {
    const wrapper = shallow(
      <Dots  subjects={[]} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />
    );

    expect(wrapper).toMatchSnapshot();
  });

})

describe('componentWillReceiveProps', () => {

  it('should not change the layers dimensions', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.state.width = 100;
      dotsLayer.state.height = 200;
      let newProps = {
        view:{dotsView:{width:100,height:200}}
      };
      let stateSpy = jest.spyOn(dotsLayer,'setState')

      dotsLayer.componentWillReceiveProps(newProps);

      expect(dotsLayer.state.width).toEqual(100)
      expect(dotsLayer.state.height).toEqual(200)
      expect(stateSpy).not.toBeCalled();

  });

  it('should not change the layers dimensions', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.state.width = 400;
      dotsLayer.state.height = 500;
      let newProps = {
        view:{dotsView:{width:100,height:200}}
      };
      let stateSpy = jest.spyOn(dotsLayer,'setState')

      dotsLayer.componentWillReceiveProps(newProps);

      expect(dotsLayer.state.width).toEqual(100)
      expect(dotsLayer.state.height).toEqual(200)
      expect(stateSpy).toBeCalledTimes(2);

  });

})

describe('makeDot', () => {

  it('should return null because of missing dimensions', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {};
      let dot = {};

      let returnValue = dotsLayer.makeDot(dot);

      expect(returnValue).toMatchSnapshot();

  });

  it('should return null because of missing dimensions', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {dots:{}};
      let dot = {};

      let returnValue = dotsLayer.makeDot(dot);

      expect(returnValue).toMatchSnapshot();

  });

  it('should return a dot component', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {dots:{center:{x:50,y:50}}};
      let dot = {
        distanceFromCenter:10,
        startAngle:10,
        angle:30,
        assignment:{name:'Test Name',type:'Type'}
      };

      let returnValue = dotsLayer.makeDot(dot);

      expect(returnValue).toMatchSnapshot();

  });

  it('should return a dot component', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {dots:{center:{x:50,y:50}}};
      let dot = {
        distanceFromCenter:10,
        startAngle:10,
        angle:30,
        r:15,
        assignment:{name:'Test Name',type:'Type'}
      };

      let returnValue = dotsLayer.makeDot(dot);

      expect(returnValue).toMatchSnapshot();
  });

})

describe('fillDotsObjs', () => {

  it('should do nothing', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();

      let returnValue = dotsLayer.fillDotsObjs();

      expect(returnValue).not.toBeDefined();
  });

  it('should add no objects because there are no assignments', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      let testSubjects = [];

      dotsLayer.fillDotsObjs(testSubjects);

      expect(dotsLayer.dotsObjs).toHaveLength(0);
  });

  it('should convert the subjects assignments to dot objects', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      let testSubjects = subjects;

      dotsLayer.fillDotsObjs(testSubjects);

      expect(dotsLayer.dotsObjs).toHaveLength(subjects.length);
      for(let i = 0; i < subjects.length; i++) {
        expect(dotsLayer.dotsObjs[i]).toHaveLength(subjects[i].assignments.length);
      }
  });

  it('should add no objects because they are out of the time range', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={()=>{return -1}} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();

      expect(dotsLayer.dotsObjs).toHaveLength(subjects.length);
      for(let i = 0; i < subjects.length; i++) {
        expect(dotsLayer.dotsObjs[i]).toHaveLength(0);
      }
  });

  it('should add no objects because they are out of the time range', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={()=>{return -3}} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();

      expect(dotsLayer.dotsObjs).toHaveLength(subjects.length);
      for(let i = 0; i < subjects.length; i++) {
        expect(dotsLayer.dotsObjs[i]).toHaveLength(0);
      }
  });

  it('should convert the subjects assignments to well-formed dot objects', () => {
    let fullView = view;
    fullView.colors = {typeColors:{Assignment:'blue'}}
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();

      expect(dotsLayer.dotsObjs).toMatchSnapshot();
  });

})

describe('getDotRows', () => {

  it('should return null', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      let dots = null;

      let returnValue = dotsLayer.getDotRows(dots)

      expect(returnValue).toMatchSnapshot();
  });

  it('should return null', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      let dots = [];

      let returnValue = dotsLayer.getDotRows(dots)

      expect(returnValue).toMatchSnapshot();
  });

  it('should return null', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view.radar = null;
      let dots = [];

      let returnValue = dotsLayer.getDotRows(dots)

      expect(returnValue).toMatchSnapshot();
  });

  it('should make variable sized rows', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {
        dots:{radius:5},
        radar:{},
      }
      let dots = [
      {distanceFromCenter:5},
      {distanceFromCenter:10},
      {distanceFromCenter:15},
      {distanceFromCenter:25}
      ];

      let returnValue = dotsLayer.getDotRows(dots)

      expect(returnValue).toMatchSnapshot();
  });

  it('should make fixed sized rows', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {
        dots:{},
        radar:{radius:100},
      }
      let dots = [
      {distanceFromCenter:5},
      {distanceFromCenter:7},
      {distanceFromCenter:10},
      {distanceFromCenter:15},
      {distanceFromCenter:25},
      {distanceFromCenter:23}
      ];

      let returnValue = dotsLayer.getDotRows(dots,true,10)

      expect(returnValue).toMatchSnapshot();
  });

  it('should make fixed sized rows using the default amount of rows', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();
      dotsLayer.view = {
        dots:{},
        radar:{radius:100},
      }
      let dots = [
      {distanceFromCenter:5},
      {distanceFromCenter:7},
      {distanceFromCenter:10},
      {distanceFromCenter:15},
      {distanceFromCenter:25},
      {distanceFromCenter:23}
      ];

      let returnValue = dotsLayer.getDotRows(dots,true)

      expect(returnValue).toMatchSnapshot();
  });

})


/*describe(' ', () => {

  it('should ', () => {
    const wrapper = shallow(
      <Dots  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let dotsLayer = wrapper.instance();


  });

})*/



