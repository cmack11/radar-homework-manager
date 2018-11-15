import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions/sampleAction';
import { initializeUser, resetUser } from './actions/userAction.js';
import { updateAssignment, initializeAssignments } from './actions/assignmentAction.js';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import './_datepicker.css';
import moment from 'moment';
import { Router, Route, Switch } from 'react-router';

import logo from './logo.svg';

import RadarScreen from './RadarScreen.js'
import {colors1} from './fakeData.js';
import './App.css';

const mapDispatchToProps = dispatch => ({
 sampleAction: () => dispatch(sampleAction()),
 initializeUser: () => dispatch(initializeUser()),
 resetUser: () => dispatch(resetUser()),
 updateAssignment : () => dispatch(updateAssignment()),
 initializeAssignments : () => dispatch(initializeAssignments())
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      counter: state.sample.counter,
      id : state.user.id,
      name : state.user.name,
      email : state.user.email,
      usertype : state.user.usertype,
      assignmentData : state.assignment.subjects,
    }
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      startDate: moment(),
      endDate: moment().add(7,'days'),
      screens:{
        home:{show:true}
      }
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.props.initializeUser();
    this.props.initializeAssignments();
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
    console.log(this.state);
  }

  onSideBarItemClicked(s) {
    let screens = this.state.screens;
    if(!screens[s])
      screens[s] = {show:true};
    for(var key in screens) {
        if(screens.hasOwnProperty(key))
            screens[key].show = (key === s)
    }

    this.setState({screens:screens})
    this.onSetSidebarOpen(false);
  }

  render() {

    return (
      <RadarScreen show={true}
        subjects={this.props.assignmentData}
        dates={{today:this.state.startDate, end:this.state.endDate}}
        view={{height:window.innerHeight,width:window.innerWidth, colors:colors1}}/>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
