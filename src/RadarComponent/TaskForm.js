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

    this.props = {defaultTaskType: 'Assignment'};
    this.state = {taskName: '', taskDesc: '', taskDueDate: '', taskType: this.props.defaultTaskType, subject: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert('The following Task was submitted: ' + this.state.taskName);
    this.props.addAssignment(
      {name:this.state.taskName, description:this.state.taskDesc, type:this.state.taskType, dueDate:moment(this.state.taskDueDate)},
      this.state.subject);
    event.preventDefault();
  }

  render() {
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
          <input name="subject" type="text" value={this.state.subject} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Task Description:
          <input name="taskDesc" type="text" value={this.state.taskDesc} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Task Type:
          <select name="taskType" onChange={this.handleChange}>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="ProblemSet">Problem Set</option>
            <option value="Reading">Reading</option>
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
