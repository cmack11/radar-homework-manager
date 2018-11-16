import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializeUser, resetUser } from './actions/userAction.js';
import {Button, Divider} from 'semantic-ui-react';
import Sidebar from "react-sidebar";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import './_datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router';
import {Switch, Link, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { IconContext } from 'react-icons';
import logo from './logo.svg';
import { MdMenu } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { MdBuild } from 'react-icons/md';
import { MdExitToApp } from 'react-icons/md';
import { MdHelp} from 'react-icons/md';

import RadarScreen from './RadarScreen.js';
import {colors1} from './fakeData.js';
import './App.css';
import RadarMain from './RadarMain.js';
import AccountSetting from './AccountSetting.js';
import AdvancedSetting from './AdvancedSetting.js';
import Help from './Help.js';
import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage.js';

import ico from './images/icon_alt.png';

const mapDispatchToProps = dispatch => ({
 initializeUser: () => dispatch(initializeUser()),
 resetUser: () => dispatch(resetUser()),
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      id : state.user.id,
      name : state.user.name,
      email : state.user.email,
    }
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarAvailable: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.props.initializeUser();
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("on route change");
      this.onRouteChange(location)
    });

    if (this.props.id == -1) {
      // not logged in
      this.props.history.push("/login")
    }
  }
  componentWillUnmount() {
      this.unlisten();
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
    console.log(this.state);
  }

  onRouteChange = (location) => {
    console.log("Route changed la mtfk " + location )
    if (location.pathname === '/login') {
      console.log("Hmm")
      this.setState({sidebarAvailable: false})
    } else {
      this.setState({sidebarAvailable: true})
    }
  }

  renderSidebar = () => (
    <div className="top-display">
      <Sidebar
        sidebar={
          <div className="menu-container" onClick={() => this.onSetSidebarOpen(false)}>
            <img className= "logo" src={ico} alt="RHW" />
            <h2 className="menu-header">{`${this.props.name}'s`}</h2>
            <p className="title">Radar Homework Manager</p>
            <Divider />
            <Link to='/'>
              <div className="menu-item" >
                <div className="icon">
                  <IconContext.Provider value={{size:25}}>
                    <MdHome />
                  </IconContext.Provider>
                </div>
                <p>Home</p>
              </div>
            </Link>
            <Link to='/account'>
              <div className="menu-item" >
                <div className="icon">
                  <IconContext.Provider value={{size:25}}>
                    <MdAccountCircle />
                  </IconContext.Provider>
                </div>
                <p>Account Settings</p>
              </div>
            </Link>
            <Link to='/adv'>
              <div className="menu-item">
                <div className="icon">
                  <IconContext.Provider value={{size:25}}>
                    <MdBuild />
                  </IconContext.Provider>
                </div>
                <p>Advanced Settings</p>
              </div>
            </Link>
            <Link to='/help'>
              <div className="menu-item">
                <div className="icon">
                  <IconContext.Provider value={{size:25}}>
                    <MdHelp />
                  </IconContext.Provider>
                </div>
                <p>Help</p>
              </div>
            </Link>
            <Link to='/login'>
              <div className="menu-item" onClick={() => this.props.resetUser()}>
                <div className="icon">
                  <IconContext.Provider value={{size:25}}>
                    <MdExitToApp />
                  </IconContext.Provider>
              </div>
                <p>Log Out</p>
              </div>
            </Link>
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
      </Sidebar>
    </div>
  );

  render() {

    return (
      <div className="App">
        {(this.state.sidebarAvailable == true) && (this.props.location.pathname !== '/login') && (this.props.location.pathname !== '/signup') && (this.renderSidebar())}
        <div className="inner-content">
          <Switch onChange={this.onRouteChange}>
            <Route path='/' exact component={RadarMain} />s
            <Route path='/adv' exact component={AdvancedSetting} />
            <Route path='/account' exact component={AccountSetting} />
            <Route path='/help' exact component={Help} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/signup' exact component={SignupPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
