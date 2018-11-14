import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

class AdvancedSetting extends Component {
render() {
  console.log("Advanced rendered")
  return (
    <div>
      <p> Advanced settings </p>
    </div>
  )
}
}

export default AdvancedSetting;
