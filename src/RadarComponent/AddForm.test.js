import React from 'react';
import AddForm from './AddForm.js';
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

const taskTypes = ['Type #1','Type #2','Type #3'];
const subjectNames = ['Subject #1','Subject #2','Subject #3'];

describe('initialization', () => {

  it('should initialize the AddForm', () => {
    const wrapper = shallow(
      <AddForm show taskTypes={taskTypes} subjectNames={subjectNames}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should not show the AddForm by returning null', () => {
    const wrapper = shallow(
      <AddForm taskTypes={taskTypes} subjectNames={subjectNames}/>,
    );

    expect(wrapper).toMatchSnapshot();
  });
})

describe('initialization', () => {

  it('should switch the form and then switch back', () => {
    const wrapper = shallow(
      <AddForm show taskTypes={taskTypes} subjectNames={subjectNames}/>,
    );
    let addForm = wrapper.instance();
    let spy = jest.spyOn(addForm,'switchForm');

    let form1 = addForm.state.form;
    addForm.switchForm();
    addForm.render();
    expect(wrapper).toMatchSnapshot();
    expect(addForm.state.form).not.toEqual(form1);

    let form2 = addForm.state.form;
    addForm.switchForm();
    addForm.render();
    expect(addForm.state.form).not.toEqual(form2);
    expect(addForm.state.form).toEqual(form1);
    expect(spy).toBeCalledTimes(2);
    expect(wrapper).toMatchSnapshot();


  });

  it('should not alter the form', () => {
    const wrapper = shallow(
      <AddForm show taskTypes={taskTypes} subjectNames={subjectNames}/>,
    );
    let addForm = wrapper.instance();
    let spy = jest.spyOn(addForm,'switchForm');
    addForm.state.form = 'UNKOWN_FORM'

    let form1 = addForm.state.form;
    addForm.switchForm();
    addForm.render();

    expect(addForm.state.form).toEqual(form1);
    expect(spy).toBeCalled();
    expect(wrapper).toMatchSnapshot();


  });
})






