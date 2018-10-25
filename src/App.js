import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from './actions/sampleAction';
import { initializeUser, resetUser } from './actions/userAction.js';
import {Button, Header, Icon, Segment, Divider} from 'semantic-ui-react';
import Sidebar from "react-sidebar";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import { IconContext } from 'react-icons';
import logo from './logo.svg';
import { MdMenu } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { MdBuild } from 'react-icons/md';
import { MdExitToApp } from 'react-icons/md';
import { MdHelp} from 'react-icons/md';

import RadarScreen from './RadarScreen.js'

import './App.css';


const mapDispatchToProps = dispatch => ({
 sampleAction: () => dispatch(sampleAction()),
 initializeUser: () => dispatch(initializeUser()),
 resetUser: () => dispatch(resetUser())
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      counter: state.sample.counter,
      id : state.user.id,
      name : state.user.name,
      email : state.user.email
    }
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      startDate: moment(new Date()),
      endDate: moment(new Date()).add(7,'days')
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.props.initializeUser();
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  onFocusChanged = () => {

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
                <div className="menu-item" onClick={() => this.onSetSidebarOpen(false)}>
                  <IconContext.Provider value={{size:20, style: { padding: 17 }}}>
                    <MdHome />
                  </IconContext.Provider>
                  <p>Home</p>
                </div>
                <div className="menu-item">
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
                <div className="menu-item">
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
          <RadarScreen subjects={[{color:'navy',assignments:[{type:'Assignment', dueDate:moment().add(3,'days')}]},{color:'maroon',assignments:[{type:'Assignment', dueDate:moment().add(1,'days')}]}]} dates={{today:this.state.startDate, end:this.state.endDate}} view={{x:100,y:100,height:window.innerHeight,width:window.innerWidth}}/>

          </Sidebar>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
