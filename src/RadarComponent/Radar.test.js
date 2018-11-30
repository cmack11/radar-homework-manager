import React from 'react';
import {Radar} from './Radar.js';
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
const view = {
  dotsView:{width:100,height:100},
  x:10,
  y:10,
  width:50,
  height:50,
  dotRadiusPercent:10,
  strokeWidth:2,
  ringsWidth:1000000,
  colors:{
    subjectDivider:'blue',
    typeColors:{Assignment:'green'}
  }
}
const dates = {
  startDate:moment('2018-09-10 14:00:00.000'),
  endDate:moment('2018-09-17 14:00:00.000')
};



describe('the initialization of the component', () => {

  it('creates default Radar component', () => {
    const wrapper = shallow(
      <Radar  subjects={[]} 
          view={{dotsView:{width:100,height:100}}} 
          />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('creates a Radar component', () => {
    const wrapper = shallow(
      <Radar  subjects={subjects} 
          view={view} 
          dates={dates}
          />
    );

    //expect(wrapper).toMatchSnapshot();
  });
})


/*describe(' ', () => {

  it('should ', () => {
    const wrapper = shallow(
      <Radar  subjects={subjects} 
          getDistanceFromCenter={getDistanceFromCenter} 
          view={view} 
          dims={dims}
          />);
      let radarObj = wrapper.instance();


  });

})*/



