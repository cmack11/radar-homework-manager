import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { initializeUser, sendCredentials } from './actions/userAction.js';
import './App.css';
import {Button, Form} from 'semantic-ui-react';
import ico from './images/icon_alt.png';


const mapDispatchToProps = dispatch => ({
 initializeUser: () => dispatch(initializeUser()),
 sendCredentials : (data, success) => dispatch(sendCredentials(data, success)),
})

const mapStateToProps = state => {
    return {
      id : state.user.id,
      name : state.user.name,
      email : state.user.email,
    }
  }

class LoginPage extends Component {
  onLoginButtonPress = () => {
     let d = {
       username: this.refs.user.value,
       password: this.refs.pw.value
     }
     this.props.sendCredentials(d, () => {this.successLogin()})
  }

  successLogin = () => {
    this.props.history.push('/')
  }

render() {
  /* add required on input later on */
  return (
    <div className="login-bg ">
      <div className="login shadow">
        <img className= "logo-login" src={ico} alt="RHW" />
        <p className="login-title">Radar Homework Manager</p>
        <Form>
            <Form.Field>
              <label className="login-text" tabIndex="2">Email</label>
              <input placeholder='email' ref="user" />
            </Form.Field>
            <Form.Field>
              <label className="login-text">Password</label>
              <input type= "password" placeholder='password' ref="pw" />
            </Form.Field>
            <Button primary className="login-button" type='submit' onClick={()=> {this.onLoginButtonPress()}}>Login</Button>
        </Form>
          <p className="forgot-password">forgot password ?</p>
      </div>
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
