import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { newUser } from './actions/userAction.js';
import './App.css';
import {Button, Form} from 'semantic-ui-react';
import ico from './images/icon_alt.png';


const mapDispatchToProps = dispatch => ({
 newUser : (data, success) => dispatch(newUser(data, success)),
})

const mapStateToProps = state => {
    return {
      name : state.user.name,
      email : state.user.email,
      pass : state.user.password
    }
  }

class SignupPage extends Component {
  onSignupButtonPress = () => {
    if (this.refs.email.value === "" || this.refs.pw.value === "" ||
        this.refs.fname.value === "" || this.refs.lname.value === "")
    {
      return false
    }
     let d = {
       name : this.refs.fname.value + " " + this.refs.lname.value,
       email: this.refs.email.value,
       pass: this.refs.pw.value
     }
     this.props.newUser(d, () => {this.successSignup()})
  }

  successSignup = () => {
    this.props.history.push('/login')
  }

render() {
  return (
    <div className="login-bg ">
      <div className="signup shadow">
        <img className= "logo-login" src={ico} alt="RHW" />
        <p className="login-title">Radar Homework Manager</p>
        <Form>
            <Form.Field>
              <label className="login-text" tabIndex="2">First Name</label>
              <input required placeholder='first name' ref="fname" />
            </Form.Field>
            <Form.Field>
              <label className="login-text" tabIndex="2">Last Name</label>
              <input required placeholder='last name' ref="lname" />
            </Form.Field>
            <Form.Field>
              <label className="login-text" tabIndex="2">Email</label>
              <input required placeholder='email' ref="email" />
            </Form.Field>
            <Form.Field>
              <label className="login-text">Password</label>
              <input  required type= "password" placeholder='password' ref="pw" />
            </Form.Field>
            <Button primary className="login-button" type='submit' onClick={()=> {this.onSignupButtonPress()}}>Sign up</Button>
        </Form>
      </div>
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
