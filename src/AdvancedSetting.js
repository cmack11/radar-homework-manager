import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { GithubPicker, ChromePicker } from 'react-color';
import {Button, Form} from 'semantic-ui-react';
import {subjects1} from './fakeData.js';
import './App.css';

class AdvancedSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  getTaskTypes() {
    return [
      {
          name: "Assignment",
          id: 0,
      },
      {
        name: "Problem Set",
        id: 1,
      },
      {
        name: "Exam",
        id: 2,
      },
      {
        name: "Reading",
        id: 3,
      }
    ];
  }

render() {
  return (
    <div style={{ display: 'table', position: 'absolute', left: 0, top: 0, width: '80%', height: '80%', margin: '10%'}}>
      <ColorSettingsRow items = {subjects1} isSubject={true}/>
      <ColorSettingsRow items = {this.getTaskTypes()} isTaskType={true}/>
      <TaskTypeEditor taskTypes={this.getTaskTypes()}/>
    </div>
  )
}
}

class TaskTypeEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {
      taskTypes: props.taskTypes,
      taskType: "",
      showDeleteTasks: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if(name === 'taskType') {
      if(value.length > 0 && value !== "")
        this.setState({taskNameError:false});
      else
        this.setState({taskNameError:true});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const buttonType = event.target.value;
    if (buttonType === "enableDelete")
      this.enableTaskTypeDeletion(event);
    else if (buttonType === "addTaskType")
      this.addTaskType();
    else
      this.deleteTaskType(event);

}

  addTaskType() {
    //TODO: Redux Hookup to Add New Type
    if (this.state.taskNameError || this.state.taskType === "")
      return;
    let newTaskTypeList = this.state.taskTypes.slice();
    newTaskTypeList.push({name: this.state.taskType});
    this.setState({taskTypes: newTaskTypeList});
  }

  enableTaskTypeDeletion(event) {
    this.setState({showDeleteTasks: true});
  }

  deleteTaskType(event) {
    //TODO: Redux Hookup
    const typeToDelete = event.target.value;

    let newTaskTypeList = [];
    for (let i = 0; i < this.state.taskTypes.length; ++i) {
      const taskType = this.state.taskTypes[i];
      if (taskType !== typeToDelete)
        newTaskTypeList.push(taskType);
    }
    this.setState({taskTypes: newTaskTypeList, showDeleteTasks: false});
  }

  render() {
    let deleteTasksButton = [];
    if (this.state.showDeleteTasks) {
      for (let i = 0; i < this.state.taskTypes.length; ++i) {
        const taskType = this.state.taskTypes[i];
        deleteTasksButton.push(
          <Button primary type="button" value={taskType} onClick={this.handleSubmit}>Delete Type: {taskType}</Button>
        );
      }
    }
    else {
      deleteTasksButton.push(
        <Button primary type="button" value="enableDelete" onClick={this.handleSubmit}>Open Task Type Delete Menu</Button>
      );
    }

    let taskTypeWithSpaces = "";
    for (let i = 0; i < this.state.taskTypes.length; ++i)
      taskTypeWithSpaces += this.state.taskTypes[i].name + " ";

    return(
      <div style={{ display: 'table-row-group', width: '100%', columnSpan:"100%"}}>
      <Form>
      <b>Current Task Types:</b><br/>
        {taskTypeWithSpaces}
      <br/>

        <Form.Field className='task-type-add'>
          <label className="label-text label-center">Add New Task Type:</label>
          <input style={{borderColor:(this.state.taskNameError ? 'red': null)}} name="taskType" type="text" onChange={this.handleChange.bind(this)} />
        </Form.Field>

        <Button primary type="button" value="addTaskType" onClick={this.handleSubmit}>Add Type</Button>
        <br/>
        <br/>
        <br/>
        {deleteTasksButton}
      </Form>
    </div>
    )
  }
}

class ColorSettingsRow extends Component {
  constructor(props) {
    super(props);
  }

  getItems() {
    if (this.props.isSubject)
      return this.getSubjects();
    else
      return this.getTaskTypes();
  }

  getSubjects() {
    //TODO: Redux Connection. Items won't be used once Redux is hooked in.
    return this.props.items;
  }

  getTaskTypes() {
    //TODO: Redux Connection. Items won't be used once Redux is hooked in.
    return this.props.items;
  }

  render() {
    const items = this.getSubjects();
    let itemsList = [];
    for (var i = 0; i < items.length; i++) {
      itemsList.push(
        <span style={{display: 'table-cell'}}>
          <SingleItemColorSelect name = {items[i].name} isSubject={this.props.isSubject}/>
        </span>);
    }

    return (
      <div style={{display: 'table-row'}}>
        <text><b>{this.props.isSubject ? "Subject" : "Task"} Color Selection: </b></text>
        {itemsList}
      </div>
    )
  }
}

class SingleItemColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {showCP: false, color: this.getCurrentColor()};

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleClick() {
    console.log("CLICKED!");
    this.setState({ showCP: !this.state.showCP })
  };

  handleClose = () => {
    this.setState({ showCP: false })
  };

  getCurrentColor() {
    //Just check for this.props.isTaskType or this.props.isSubject to know.
    //TODO: Redux, get current color
    return '#000'
  }

  handleChangeColor(color, event) {
      //TODO: Redux change color. Just check for this.props.isTaskType or this.props.isSubject to know.
      this.setState({color: color.hex});
  }

  render() {
    const fullscreenCover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
       <div style={{display: 'table-cell', background: this.state.color}}>
        <button onClick={ this.handleClick }>{this.props.name}</button>
        { this.state.showCP ?
          <div style={{position: 'absolute', zIndex: '2'}}>
            <div style={ fullscreenCover } onClick={ this.handleClose }/>
            <GithubPicker triangle={'none'} onChangeComplete={this.handleChangeColor}/>
          </div>
          : null }
      </div>
    )
  }
}

export default AdvancedSetting;
