import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

class Help extends Component {
render() {
  console.log("Advanced rendered")
  return (
    <div>
      <p> Email Clay for help </p>
    </div>
  )
}
}

export default Help;
