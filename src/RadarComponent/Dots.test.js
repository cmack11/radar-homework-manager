import React from 'react';
import Dots from './Dots.js';
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

const getDistanceFromCenter = function() {};
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



