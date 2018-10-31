import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.props = {defaultTaskType: 'Assignment', subject: ''};
    this.state = {taskName: '', taskDesc: '', taskDueDate: '', taskType: this.props.defaultTaskType, };

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
    alert('The following Task was Submitted: ' + this.state.taskName);
    //TODO: This is where the code needs to hook into Redux
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Task Name:
          <input name="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
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

export default TaskForm;