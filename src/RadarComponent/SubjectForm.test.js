import React from 'react';
import {SubjectForm} from './SubjectForm.js';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
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
  		const component = shallow(<SubjectForm subjectNames={[]} taskTypes={[]} addSubject={()=>{}}/>,);
		const spy = jest.spyOn(component.instance(),'handleChange');
  	
  		component.instance().handleChange(event);
  	
  		expect(spy).toBeCalled();
   });
})

describe('the handleSubmit funtion', () => {
	
	it('should call handleSubmit', () => {
  		const component = shallow(<SubjectForm subjectNames={[]} taskTypes={[]} addSubject={()=>{}}/>,);
		const spy = jest.spyOn(component.instance(),'handleSubmit');
  	
  		component.instance().handleSubmit(event);
  	
  		expect(spy).toBeCalled();
   });
})

describe('isValid Check', () => {
	
	it('Check if valid input gets submitted', () => {
		const wrapper = shallow(
			<SubjectForm taskTypes={["assignment", "exam"]} subjectNames = {["sub1", "sub2"]} addSubject={() => {}}/>
		);
		let instance = wrapper.instance();
		instance.state.subjectName = "NewSub";
		instance.state.subjectDesc = "SOME DESC";
		instance.state.defaultTaskType = "assignment";
		instance.handleSubmit();
		expect(wrapper).toMatchSnapshot();
   });
})

//   {name:this.state.subjectName, color:color, assignments:[], description:this.state.subjectDesc, defaultType:this.state.defaultTaskType});