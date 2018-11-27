import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions/sampleAction';
import { initializeUser, resetUser } from './actions/userAction.js';
import { updateTask, retrieveTasks, retrieveOverdueTasks, retrieveCompletedTasks, retrieveTypes } from './actions/assignmentAction.js';
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
 retrieveTasks : (user_id) => dispatch(retrieveTasks(user_id)),
 retrieveOverdueTasks : (user_id) => dispatch(retrieveOverdueTasks(user_id)),
 retrieveCompletedTasks : (user_id) => dispatch(retrieveCompletedTasks(user_id)),
 retrieveTypes : (user_id) => dispatch(retrieveTypes(user_id)),
})

const mapStateToProps = state => {
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
      this.props.retrieveTasks(this.props.id);
      this.props.retrieveOverdueTasks(this.props.id);
      this.props.retrieveCompletedTasks(this.props.id);
      this.props.retrieveTypes(this.props.id);
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
