import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {DotViewer} from './DotViewer.js'
import moment from 'moment'

const fakeDataTask =
    {
        name:"S1A1",
        type:"Assignment",
        dueDate:moment('2018-09-13 14:00:00.000'),
        subject:"Subject #1",
    }
    
    const fakeDot = {
        fill: "white",
        x: 5,
        y: 20,
        assignment: fakeDataTask,
        id: 55,
    }

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() })
        jest.useFakeTimers();
      });
    
      describe('DotViewer Tests', () => {
    
        it('Creating Blank DotViewer', () => {
          const wrapper = shallow(
                <DotViewer />
          );
      
          expect(wrapper).toMatchSnapshot();
        });

        it('Creating Initialized DotViewer', () => {
            const wrapper = shallow(
                <DotViewer width={250} height={200} dot={fakeDot} edit={()=>{}} delete={()=>{}} complete={()=>{}} close={()=>{}}/>
		
            );
        
            expect(wrapper).toMatchSnapshot();
          });

          it('Invisible DotViewer', () => {
            const wrapper = shallow(
                <DotViewer visible={false} width={250} height={200} dot={fakeDot} edit={()=>{}} delete={()=>{}} complete={()=>{}} close={()=>{}}/>
		
            );
        
            expect(wrapper).toMatchSnapshot();
          });

          it('Deleted Assignment DotViewer', () => {
            const wrapper = shallow(
                <DotViewer visible={false} width={250} height={200} dot={fakeDot} edit={()=>{}} delete={()=>{}} complete={()=>{}} close={()=>{}}/>
		
            );
            let instance = wrapper.instance();
            instance.deleteAssignment();
            expect(wrapper).toMatchSnapshot();
          });

          it('Completed Assignment DotViewer', () => {
            const wrapper = shallow(
                <DotViewer visible={false} width={250} height={200} dot={fakeDot} edit={()=>{}} delete={()=>{}} complete={()=>{}} close={()=>{}}/>
		
            );
            let instance = wrapper.instance();
            instance.completeAssignment();
            expect(wrapper).toMatchSnapshot();
          });
      })