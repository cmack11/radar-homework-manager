import React from 'react';
import { connect } from 'react-redux';
import { retrieveAssignments, addAssignment } from '../actions/assignmentAction.js';
import moment from 'moment';

const mapDispatchToProps = dispatch => ({
 retrieveAssignments: () => dispatch(retrieveAssignments()),
 addAssignment: (assignment, subject) => dispatch(addAssignment(assignment, subject)),
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      /* map this later
      name:"",
      color:"",
      assignments:[],
      */
    }
  }

export class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {taskName: '', taskDesc: '', taskDueDate: '', subject: 'Subject #1', taskType: 'Assignment'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setDefaultFields() {
    let defaultState = {taskName: '', taskDesc: '', taskDueDate: '', subject: 'Subject #1'};
    this.setState(defaultState);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.addAssignment(
      {name:this.state.taskName, description:this.state.taskDesc, type:this.state.taskType, dueDate:moment(this.state.taskDueDate)},
      this.state.subject);
      this.setDefaultFields();
  }

  render() {
    let subjectOptions = [];
    for (let i = 0; i < this.props.subjectNames.length; ++i)
    {
      const subject = this.props.subjectNames[i];
      subjectOptions.push(<option value={subject}>{subject}</option>);
    }

    let taskTypeOptions = [];
    for (let i = 0; i < this.props.taskTypes.length; ++i)
    {
      const taskType = this.props.taskTypes[i];
      taskTypeOptions.push(<option value={taskType}>{taskType}</option>);
    }

    return (
      <form>
        <b>Add Task</b>
        <br/>
        <label>
          Task Name:
          <input name="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Subject:
          <select name="subject" value={this.state.subject} onChange={this.handleChange}>
            {subjectOptions}
          </select>
        </label>
        <br />
        <label>
          Task Description:
          <input name="taskDesc" type="text" value={this.state.taskDesc} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Task Type:
          <select name="taskType" value={this.state.taskType} onChange={this.handleChange}>
            {taskTypeOptions}
          </select>
        </label>
        <br />
        <label>
          Task Due Date:
          <input name="taskDueDate" type="text" placeholder = "MM/DD/YYYY" value={this.state.taskDueDate} onChange={this.handleChange} />
        </label>
        <br />
        <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
