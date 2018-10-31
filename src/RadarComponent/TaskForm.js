import React from 'react';
import { connect } from 'react-redux';
import { retrieveAssignments } from '../actions/assignmentAction.js';

const mapDispatchToProps = dispatch => ({
 retrieveAssignments: () => dispatch(retrieveAssignments())
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

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.props = {defaultTaskType: 'Assignment', subject: 'NEEDS SUBJECT'};
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
    this.props.retrieveAssignments(this.state.taskName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <b>Add Task To {this.props.subject}</b>
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
