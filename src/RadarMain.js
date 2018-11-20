import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions/sampleAction';
import { initializeUser, resetUser } from './actions/userAction.js';
import { updateAssignment, retrieveAssignments, retrieveOverdueAssignments, retrieveCompletedAssignments } from './actions/assignmentAction.js';
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
 initializeUser: () => dispatch(initializeUser()),
 retrieveAssignments : (user_id) => dispatch(retrieveAssignments(user_id)),
 retrieveOverdueAssignments : (user_id) => dispatch(retrieveOverdueAssignments(user_id)),
 retrieveCompletedAssignments : (user_id) => dispatch(retrieveCompletedAssignments(user_id)),
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      counter: state.sample.counter,
      id : state.user.user_id,
      name : state.user.name,
      email : state.user.email,
      assignmentData : state.assignment.subjects,
    }
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment().add(7,'days'),
    };
    if(this.props.id != -1) {
      console.log("Before init assignment " + this.props.id)
      this.props.retrieveAssignments(this.props.id);
      this.props.retrieveOverdueAssignments(this.props.id);
      this.props.retrieveCompletedAssignments(this.props.id);
    }
  }

  componentDidUpdate() {


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
