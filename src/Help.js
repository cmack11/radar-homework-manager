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
    	<p>Radar Homework Manager is a graphical interface that allows you to organize your school work in a convenient way.  Your radar
    	will be divided into sectors which represent the subjects that you are taking.  Each sector contains the tasks or assignments which need to be 
    	completed for that subject.  Assignments will move closer to the center of the radar as you come closer to their due date.  This helps you visualize your 
    	deadlines so you can prioritze assignments.  You can click on any assignment or subject to view details, change the colors of your interface, 
    	and track all your completed work.</p>
    	<br />
    	<br />
    	
    	<p>ADDING SUBJECTS AND TASKS:</p>
    	<br />
    	<p>To get started, you need to add subjects to your radar.  To do this, click the plus symbol on the bottom right of the screen.  You can then input 
    	the required information and click 'submit'.  As you add more subjects to your radar, you will see more pie slices to represent them.  Next, you can 
    	add your assignments into each of your subject.  Click the same add symbol as before.  When the add subject popup appears, hit the little switch icon 
    	in the top right of the popup.  This will bring you to the add task popup.  Here you can add the apporpirate information for the task you are creating. 
    	Once you hit submit, you will see the task appear on your radar. </p>
    	<br />
    	<br />
    	
    	<p>EDITING AND COMPLETING Tasks:</p>
    	<br />
    	<p>Did you input the wrong information in your new task?  Did you put it in the wrong subject?  No worries!  You can easily edit the information of your 
    	assignments.  You can do this in two ways.  Your task dots are actually draggable.  The first option is to click and drag your task to the bottom right 
    	of the screen.  Drop in the big blue circle with the pencil icon.  This will bring up the edit task popup.  You can also click on the task, and in the task 
    	viewer that pops up, you can click on the little pencil icon.  This will also bring up the edit task popup.  In the edit task popup, just change the info you 
    	need to and hit save!  It is that easy!</p>
    	<br />
    	<p>When you finish an assignment, you will want to mark it as complete.  There are also three ways to do this.  Similar to the edit task function, you can 
    	click and drag the task dot.  Drag it to the check mark icon in the bottom left of the screen.  This will remove the task from the radar and add it to the completed
    	assignments list.  You can also click the completed icon in the viewer popup for that task.  The last way you can complete assignments is by clicking on the parent subject/'s 
    	name, and clicking the complete button for that task.</p>
    	<br />
    	<br />
    	
    	<p>COMPLETED AND OVERDUE TASKS:</p>
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
