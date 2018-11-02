import React from 'react';
import {TaskForm} from './TaskForm.js';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from "sinon";

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  jest.useFakeTimers();
});

const event = {
	target: '',
	name : '',
	value: '',
	preventDefault: () => {},
}


describe('the handleChange funtion', () => {
	
	it('should call handleChange', () => {
  		const component = shallow(<TaskForm/>,);
		const spy = jest.spyOn(component.instance(),'handleChange');
  	
  		component.instance().handleChange(event);
  	
  		expect(spy).toBeCalled();
   });
})

describe('the handleSubmit funtion', () => {
	
	it('should call handleSubmit', () => {
  		const component = shallow(<TaskForm addAssignment={()=>{}}/>,);
		const spy = jest.spyOn(component.instance(),'handleSubmit');
  	
  		component.instance().handleSubmit(event);
  	
  		expect(spy).toBeCalled();
   });
})


