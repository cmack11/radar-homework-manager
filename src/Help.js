import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react'
import './App.css';
import ico from './images/icon_alt.png';

class Help extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {

    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

render() {
  const { activeIndex } = this.state
  return (
    <div className="help-container">
      <div className="help-title">
          <p className="login-title help-text">Radar Homework Manager : Guide</p>
      </div>
      <Accordion fluid styled>
      <Accordion.Title active={true} index={0} onClick={this.handleClick}>
        <Icon name='dropdown' />
        What is Radar Homework Manager?
      </Accordion.Title>
      <Accordion.Content active={true}>
        <p>
          Radar Homework Manager is a graphical interface that allows you to organize your school work in a convenient way.  Your radar
        	will be divided into sectors which represent the subjects that you are taking.  Each sector contains the tasks or assignments which need to be
        	completed for that subject.  Assignments will move closer to the center of the radar as you come closer to their due date.  This helps you visualize your
        	deadlines so you can prioritze assignments.  You can click on any assignment or subject to view details, change the colors of your interface,
        	and track all your completed work.
          </p>
      </Accordion.Content>
      <Accordion.Title active={true} index={1} onClick={this.handleClick}>
        <Icon name='dropdown' />
        Adding Subjects and Tasks
      </Accordion.Title>
      <Accordion.Content active={true}>
        <p>
          To get started, you need to add subjects to your radar.  To do this, click the plus symbol on the bottom right of the screen.  You can then input
        	the required information and click 'submit'.  As you add more subjects to your radar, you will see more pie slices to represent them.  Next, you can
        	add your assignments into each of your subject.  Click the same add symbol as before.  When the add subject popup appears, hit the little switch icon
        	in the top right of the popup.  This will bring you to the add task popup.  Here you can add the apporpirate information for the task you are creating.
        	Once you hit submit, you will see the task appear on your radar.
        </p>
      </Accordion.Content>
      <Accordion.Title active={true} index={2} onClick={this.handleClick}>
        <Icon name='dropdown' />
        Editing and Completing a Task
      </Accordion.Title>
      <Accordion.Content active={true}>
        <p>
          Did you input the wrong information in your new task?  Did you put it in the wrong subject?  No worries!  You can easily edit the information of your
          assignments.  You can do this in two ways.  Your task dots are actually draggable.  The first option is to click and drag your task to the bottom right
          of the screen.  Drop in the big blue circle with the pencil icon.  This will bring up the edit task popup.  You can also click on the task, and in the task
          viewer that pops up, you can click on the little pencil icon.  This will also bring up the edit task popup.  In the edit task popup, just change the info you
          need to and hit save!  It is that easy!
        </p>
        <br />
          <p>
            When you finish an assignment, you will want to mark it as complete.  There are also three ways to complete an assignment. Similar to editing a task, you can
            click and drag the task dot.  Drag it to the check mark icon in the bottom left of the screen.  This will remove the task from the radar and add it to the completed
            assignments list.  You can also click the completed icon in the viewer popup for that task.  The last way you can complete assignments is by clicking on the parent subject's
            name, and clicking the complete button for that task.
          </p>
      </Accordion.Content>
      <Accordion.Title active={true} index={3} onClick={this.handleClick}>
        <Icon name='dropdown' />
        Completed and Overdue Task
      </Accordion.Title>
      <Accordion.Content active={true}>
        <p>
          Completed assignments are assignments that has been finished before the due date.
          These assignments will be shown when you click the history button. There are two ways to complete an assignment :
        </p>
        <br/>
        <p>
          1. Click on the task dot and this will open the Task Viewer. Select the checkmark icon on the bottom left
        </p>
        <br/>
        <p>
          2. Drag the task dot and drop it to green checkmark button
        </p>
        <p>
          Overdue assignments are assignments that are not completed on the due date or the following days after.
          Overdue assignments are listed on the notification icon that is located on the top right of the scren.
          Once the overdue assignment is completed, click "complete assignment" button.
        </p>
      </Accordion.Content>
      <Accordion.Title active={true} index={4} onClick={this.handleClick}>
        <Icon name='dropdown' />
        Editing and Completing a Task
      </Accordion.Title>
      <Accordion.Content active={true}>
        <p>
          Your Radar Homework Manager can be customized in the Advanced Settings tab.
          In the advanced settings, you can change the color of each subject and assignment type.
          To add a new assignment type, type in a new name for the type and press the confirm button.
          If there is an assignment type that needs to be deleted, click the "Open Task Type Delete Menu"
          and there will be the option to delete a specific assignment type.
        </p>
      </Accordion.Content>
    </Accordion>
    </div>
  )
}
}

export default Help;
