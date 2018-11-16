import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { initializeUser, sendCredentials } from './actions/userAction.js';
import './App.css';
import {Button, Form} from 'semantic-ui-react';
import ico from './images/icon_alt.png';


const mapDispatchToProps = dispatch => ({
 sendCredentials : (data, success) => dispatch(sendCredentials(data, success)),
})

const mapStateToProps = state => {
    return {
      user_id : state.user.id,
      name : state.user.name,
      email : state.user.email,
    }
  }

class LoginPage extends Component {
  onLoginButtonPress = () => {
    if (this.refs.user.value === "" || this.refs.pw.value === "")
    {
      return false
    }
     let d = {
       user: this.refs.user.value,
       pass: this.refs.pw.value
     }
     this.props.sendCredentials(d, () => {this.successLogin()})
  }

  successLogin = () => {
    this.props.history.push('/')
  }

  gotoSignup = () => {
      this.props.history.push('/signup')
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
              <input required placeholder='email' ref="user" />
            </Form.Field>
            <Form.Field>
              <label className="login-text">Password</label>
              <input  required type= "password" placeholder='password' ref="pw" pattern=".{6,20}"/>
            </Form.Field>
            <Button primary className="login-button" type='submit' onClick={()=> {this.onLoginButtonPress()}}>Login</Button>
        </Form>
          <div className="subtext-container">
            <p className="subtext-login">forgot password ?</p>
            <p className="subtext-divider">|</p>
            <p className="subtext-login"  onClick={()=> {this.gotoSignup()}}>New user? sign up!</p>
          </div>
      </div>
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
