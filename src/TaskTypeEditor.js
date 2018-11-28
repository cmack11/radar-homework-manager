import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { newType, deleteType } from './actions/assignmentAction.js'




const mapDispatchToProps = dispatch => ({
  newType : (user_id, name, color) => dispatch(newType(user_id, name, color)),
  deleteType : (type_id) => dispatch(deleteType(type_id))
})

const mapStateToProps = state => {
    return {
      id: state.user.user_id,
      subjects : state.assignment.subjects,
      types : state.assignment.typesDict,
    }
  }

export class TaskTypeEditor extends Component {
  constructor(props) {
    super();
    this.state = {
      taskTypes: props.taskTypes,
      taskType: "",
      taskColor:"black",
      showDeleteTasks: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    if (name === 'taskType') {
      if (value.length > 0 && value !== "")
        this.setState({ taskNameError: false });
      else
        this.setState({ taskNameError: true });
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
    if (this.state.taskNameError || this.state.taskType === "")
      return;
    let newTaskTypeList = this.state.taskTypes.slice();
    newTaskTypeList.push({ name: this.state.taskType });
    this.setState({ taskTypes: newTaskTypeList });

    this.props.newType(this.props.id, this.state.taskType, this.state.taskColor)
  }

  enableTaskTypeDeletion(event) {
    this.setState({ showDeleteTasks: true });
  }

  deleteTaskType(event) {
    const typeToDelete = event.target.value;
    let newTaskTypeList = [];

    for (let key in this.props.types) {
      let taskType = this.props.types[key];
      if (taskType.name !== typeToDelete) {
        newTaskTypeList.push(taskType);
      } else {
        this.props.deleteType(taskType.type_id)
      }
    }

    this.setState({ taskTypes: newTaskTypeList, showDeleteTasks: false });
  }

  render() {
    let deleteTasksButton = [];
    if (this.state.showDeleteTasks) {
      for (let key in this.props.types) {
        const taskType = this.props.types[key].name;
        deleteTasksButton.push(<Button primary type="button" value={taskType} onClick={this.handleSubmit}>Delete Type: {taskType}</Button>);
      }
    }
    else {
      deleteTasksButton.push(<Button primary type="button" value="enableDelete" onClick={this.handleSubmit}>Open Task Type Delete Menu</Button>);
    }
    let taskTypeWithSpaces = "";
    for (let i = 0; i < this.state.taskTypes.length; ++i)
      taskTypeWithSpaces += this.state.taskTypes[i].name + " ";
    return (<div style={{ display: 'block', width: '100%' }}>
      <Form>
        <b>Current Task Types:</b><br />
        {taskTypeWithSpaces}
        <br />

        <Form.Field className='task-type-add'>
          <label className="label-text label-center">Add New Task Type:</label>
          <input style={{ borderColor: (this.state.taskNameError ? 'red' : null) }} name="taskType" type="text" onChange={this.handleChange.bind(this)} />
        </Form.Field>

        <Button primary type="button" value="addTaskType" onClick={this.handleSubmit}>Add Type</Button>
        <br />
        <br />
        <br />
        {deleteTasksButton}
      </Form>
    </div>);
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskTypeEditor)
