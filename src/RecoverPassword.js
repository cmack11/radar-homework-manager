import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { resetPassword } from './actions/userAction.js';
import './App.css';
import {Button, Form} from 'semantic-ui-react';
import ico from './images/icon_alt.png';
import { MdKeyboardBackspace } from 'react-icons/md';
import { IconContext } from 'react-icons';


const mapDispatchToProps = dispatch => ({
 resetPassword : (email, success) => dispatch(resetPassword(email,success)),
})

const mapStateToProps = state => {
    return {
      user_id : state.user.id,
      name : state.user.name,
      email : state.user.email,
    }
  }

class RecoverPassword extends Component {
  onResetButtonPress = () => {

    if (this.refs.user.value === "")
    {
      return false
    }
    else {
      this.props.resetPassword(this.refs.user.value, () => {this.gotoLogin()})
    }
  }

  gotoLogin = () => {
      this.props.history.push('/login')
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
            <Button primary className="login-button" type='submit' onClick={()=> {this.onResetButtonPress()}}>Reset Password</Button>
        </Form>
        <div className="back-container" onClick={()=> {this.gotoLogin()}}>
          <div className="back-align">
            <IconContext.Provider value={{size:22}}>
              <MdKeyboardBackspace />
            </IconContext.Provider>
          </div>
          <p className="back">back</p>
        </div>
      </div>
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
