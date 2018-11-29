import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

const mapDispatchToProps = dispatch => ({
})

class AccountSetting extends Component {

render() {
  console.log("Acc rendered")
  return (
    <div>
      <p> Account settings </p>
    </div>
  )
}
}

export default AccountSetting;
