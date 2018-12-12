import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';
import AccountSettingsForm from './AccountSettingsForm.js'

const mapDispatchToProps = dispatch => ({
})

class AccountSetting extends Component {

render() {
  return (
    <div>
      <p className="acc-title"> Account settings </p>
      <AccountSettingsForm className="acc-container" />
    </div>
  )
}
}

export default AccountSetting;
