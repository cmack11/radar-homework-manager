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

class SubjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {subjectName: '', subjectDesc: '', defaultTaskType: 'Assignment', };

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
    alert('The following Subject was submitted: ' + this.state.subjectName);
    this.state.retrieveAssignments(this.state.subjectName);
    event.preventDefault();
  }

  render() {
    return (
      <form >
        <b>Add New Subject</b>
        <br/>
        <label>
          Subject Name:
          <input name="subjectName" type="text" value={this.state.subjectName} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Subject Description:
          <input name="subjectDesc" type="text" value={this.state.subjectDesc} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Default Task Type:
          <select name="defaultTaskType" onChange={this.handleChange}>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="ProblemSet">Problem Set</option>
            <option value="Reading">Reading</option>
          </select>
        </label>
        <br />
        <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
