import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TaskList from './TaskList.js'
import moment from 'moment'

const fakeDataTasks = [
    {
        name:"S1A1",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1PS2",
        type:"Problem Set",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1A3",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1PS4",
        type:"Problem Set",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1A5",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1R6",
        type:"Reading",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1A7",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    },{
        name:"S1A8",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
      subject:"Subject #1",
    }
];

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() })
    jest.useFakeTimers();
  });

  describe('Initialization of TaskList', () => {

    it('Creating TaskList with Tasks', () => {
      const wrapper = shallow(
            <TaskList title={"TestTaskList"} assignments={fakeDataTasks} />
      );
  
      expect(wrapper).toMatchSnapshot();
    });
  
    it('Creating Empty TaskList', () => {
      const wrapper = shallow(
        <TaskList />
      );
  
      expect(wrapper).toMatchSnapshot();
    });
  
  })

  describe('Hide/Show Subjects Column', () => {

    it('TaskList with Subjects Column', () => {
      const wrapper = shallow(
        <TaskList title={"TestTaskList"} hideSubjectCol={false} assignments={fakeDataTasks} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  
    it('TaskList without Subjects Column', () => {
      const wrapper = shallow(
        <TaskList title={"TestTaskList"} hideSubjectCol={true} assignments={fakeDataTasks} />
      );
        expect(wrapper).toMatchSnapshot();
    });
  
  })

  describe('Hiding TaskList', () => {

    it('Set visible flag to false', () => {
      const wrapper = shallow(
            <TaskList title={"TestTaskList"} visible={false} assignments={fakeDataTasks} />
      );
  
      expect(wrapper).toMatchSnapshot();
    });
  
  })

  describe('TaskList ReactTable calls', () => {

    it('TaskList: getTrProps', () => {
      const wrapper = shallow(
            <TaskList title={"TestTaskList"} visible={true} assignments={fakeDataTasks} />
      );
        let instance = wrapper.instance();
        const original = {
            subject: "Subject #1",
            type: "assignment"
        };
        const rowInfo = {
            original: {original}
        };
      expect(instance.getTrProps(null, rowInfo, null)).toMatchSnapshot();
    });

    it('TaskList: getTrProps with useTypeColors', () => {
      const colors = {assignment: "blue"};
      const wrapper = shallow(
            <TaskList title={"TestTaskList"} visible={true} useTypeColors={true} assignments={fakeDataTasks} colors={colors}/>
      );
        let instance = wrapper.instance();
        const original = {
            subject: "Subject #1"
        };
        const rowInfo = {
            original: {original}
        };
      expect(instance.getTrProps(null, rowInfo, null)).toMatchSnapshot();
    });

    it('TaskList: getTrProps with null rowInfo', () => {
      const colors = {assignment: "blue"};
      const wrapper = shallow(
            <TaskList title={"TestTaskList"} visible={true} useTypeColors={true} assignments={fakeDataTasks} colors={colors}/>
      );
        let instance = wrapper.instance();

      expect(instance.getTrProps(null, null, null)).toMatchSnapshot();
    });
  
    it('TaskList: getTdProps', () => {
        const wrapper = shallow(
              <TaskList title={"TestTaskList"} visible={true} assignments={fakeDataTasks} />
        );
          let instance = wrapper.instance();
          const original = {
              subject: "Subject #1"
          };
          const rowInfo = {
              original: {original}
          };
          const column = {
              id: "type"
          };
        expect(instance.getTdProps(null, rowInfo, column, null)).toMatchSnapshot();
      });

      it('TaskList: getTdProps with null rowInfo', () => {
        const wrapper = shallow(
              <TaskList title={"TestTaskList"} visible={true} assignments={fakeDataTasks} />
        );
          let instance = wrapper.instance();

          const column = {
              id: "type"
          };
        expect(instance.getTdProps(null, null, column, null)).toMatchSnapshot();
      });

  })