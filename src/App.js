import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions/sampleAction';
import { initializeUser, resetUser } from './actions/userAction.js';
import { updateAssignments, initializeAssignments } from './actions/assignmentAction.js';
import {Button, Header, Icon, Segment, Divider} from 'semantic-ui-react';
import Sidebar from "react-sidebar";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import './_datepicker.css';
import moment from 'moment';
import { Router, Route, Switch } from 'react-router';
import {axios} from 'axios';

import { IconContext } from 'react-icons';
import logo from './logo.svg';
import { MdMenu } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { MdBuild } from 'react-icons/md';
import { MdExitToApp } from 'react-icons/md';
import { MdHelp} from 'react-icons/md';

import RadarScreen from './RadarScreen.js'
import {colors1} from './fakeData.js';
import './App.css';

const mapDispatchToProps = dispatch => ({
 sampleAction: () => dispatch(sampleAction()),
 initializeUser: () => dispatch(initializeUser()),
 resetUser: () => dispatch(resetUser()),
 updateAssignments : () => dispatch(updateAssignments()),
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
      startDate: moment(new Date()),
      endDate: moment(new Date()).add(7,'days'),
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

  onFocusChanged = () => {
    /* to be added */
  }

  render() {

    return (
      <div className="App">
        <div className="top-display">
          <Sidebar
            sidebar={
              <div className="menu-container" onClick={() => this.onSetSidebarOpen(false)}>
                <p>{`${this.props.name}'s`}</p>
                <h2 className="menu-header">Radar Homework Manager</h2>
                <Divider />
                <div className="menu-item" onClick={() => this.onSideBarItemClicked('home')}>
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdHome />
                  </IconContext.Provider>
                  <p>Home</p>
                </div>
                <div className="menu-item" onClick={() => this.onSideBarItemClicked('accountsettings')}>
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdAccountCircle />
                  </IconContext.Provider>
                  <p>Account Settings</p>
                </div>
                <div className="menu-item">
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdBuild />
                  </IconContext.Provider>
                  <p>Advanced Settings</p>
                </div>
                <div className="menu-item">
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdHelp />
                  </IconContext.Provider>
                  <p>Help</p>
                </div>
                <div className="menu-item" onClick={() => this.props.resetUser()}>
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdExitToApp />
                  </IconContext.Provider>
                  <p>Log Out</p>
                </div>
              </div>
            }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white", display: 'flex'} }}
          >
            <div className="top-right">
              <IconContext.Provider value={{size:40 }}>
                <MdMenu onClick={() => this.onSetSidebarOpen(true)}/>
              </IconContext.Provider>
            </div>
            <RadarScreen show={this.state.screens.home.show}
              subjects={this.props.assignmentData}
              dates={{today:this.state.startDate, end:this.state.endDate}}
              view={{height:window.innerHeight,width:window.innerWidth, colors:colors1}}/>
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
