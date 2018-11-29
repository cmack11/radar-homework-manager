import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import './App.css';

class Help extends Component {
render() {
  console.log("Advanced rendered")
  return (
    <div>
    	<br />
    	<br />
    	<p> GENERAL OVERVIEW: </p>
    	<br />
    	<p> Radar Homework Manager is a graphical interface that allows you to ...</p>
    	<br />
    	<br />
    	
    	<p>ADDING SUBJECTS AND TASKS:</p>
    	<br />
    	<p>First, you should add subjects to your radar.  To do this, click the plus symbol on the bottom right of the screen.  You can then input the required information and... </p>
    	<br />
    	<br />
    	
    	<p>EDITING AND COMPLETING:</p>
    	<br />
    	<p>Blah blah...</p>
    	<br />
    	<br />
    	
    	<p>OVERDUE TASKS:</p>
    	<br />
    	<p>Blah Blah...</p>
    	<br />
    	<br />
    	
    	<p>CUSTOMIZING YOUR RADAR:</p>
    	<br />
    	<p>Blah Blah...</p>
    	<br />
    	<br />
    	
      <p> For further help or issues regarding bugs, contact us at "insert Clay's email"</p>
      <br />
    	<br />
    </div>
  )
}
}

export default Help;
