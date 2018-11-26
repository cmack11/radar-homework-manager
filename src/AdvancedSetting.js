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
    //TODO: Redux Hook
    return ["Assignment", "Problem Set", "Exam", "Reading"];
  }

render() {
  return (
    <div>
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
    if (this.state.taskNameError)
      return;
    let newTaskTypeList = this.state.taskTypes.slice();
    newTaskTypeList.push(this.state.taskType);
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
    this.setState({taskTypes: newTaskTypeList});
  }

  render() {
    let deleteTasksButton = [];
    if (this.state.showDeleteTasks) {
      for (let i = 0; i < this.state.taskTypes.length; ++i) {
        const taskType = this.state.taskTypes[i];
        deleteTasksButton.push(
          <Button primary type="button" value={taskType} onClick={this.handleSubmit}>Delete {taskType}</Button>
        );
      }
    }
    else {
      deleteTasksButton.push(
        <Button primary type="button" value="enableDelete" onClick={this.handleSubmit}>Delete Task Type</Button>
      );
    }
    return(
    <div style={{display: 'grid',  justifyContent:'center', alignItems:'center', width: '320'}}>

      <Form>
        <Form.Field className='task-type-add'>
          <label className="label-text label-center">Add New Task Type:</label>
          <input style={{borderColor:(this.state.taskNameError ? 'red': null)}} name="taskType" type="text" onChange={this.handleChange.bind(this)} />
        </Form.Field>

        <Button primary type="button" value="addTaskType" onClick={this.handleSubmit}>Add Type</Button>
      </Form>
      <br/>
      {this.state.taskTypes}
      <br/>
      {deleteTasksButton}
    </div>
    )
  }
}

class SubjectColorSettings extends Component {
  constructor(props) {
    super(props);
  }

  getSubjects() {
    //TODO: Redux Connection
    return this.props.subjects;
  }

  updateSubjectColor(subject, color) {
    //TODO: Redux Connection
    var subjects = this.getSubjects();
    for (var i = 0; i < subjects.length; i++) {
      if (subjects[i].name === subject) {
        subjects[i].color = color;
        break;
      }
    }
    this.props.subjects = subjects;
  }

  render() {
    const subjects = this.getSubjects();
    let subjectList = [];
    for (var i = 0; i < subjects.length; i++) {
      subjectList.push(<SingleSubjectColor subjectName = {subjects[i].name} />);
    }

    return (
      <div>
        <text><b>Subject Color Selection: </b></text>
        {subjectList}
      </div>
    )
  }
}

class SingleSubjectColor extends Component {
  constructor(props) {
    super(props);
    this.state = {showCP: false};
  }

  handleClick() {
    console.log("CLICKED!");
    this.setState({ showCP: !this.state.showCP })
  };

  handleClose = () => {
    this.setState({ showCP: false })
  };

  handleChangeColor(color, event) {
      //TODO: Redux change color.
  }

  render() {

    return (
       <div onClick={() => { alert("hello world")} }>
        <button onClick={() => { alert("hello world")} }>{this.props.subjectName}</button>
        { this.state.showCP ?
          <GithubPicker onChangeComplete={this.handleChangeColor}/>
          : null }
      </div>
    )
  }
}

export default AdvancedSetting;
