import React from 'react';
import { connect } from 'react-redux';
import { retrieveAssignments, addAssignment } from '../actions/assignmentAction.js';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import image from '../images/switch_form.png'


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

    this.state = this.getDefaultState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() {
    let defaultState = {taskName: '', taskDesc: '', taskType:'Assignment', taskDueDate:moment().add(1,'hours'), subject: 'Subject #1', focused:false};
    return defaultState;
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
      {subject:this.state.subject, name:this.state.taskName, description:this.state.taskDesc, type:this.state.taskType, dueDate:this.state.taskDueDate},
      this.state.subject);
      this.setState(this.getDefaultState());
      if(this.props.closeForm)
        this.props.closeForm();
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
      <div style={{position:'absolute',
            backgroundColor:'grey',
            width:this.props.width,
            left:(window.innerWidth-this.props.width)/2,
            top:(window.innerHeight-250)/2,
            padding:20,
            border:5,
            borderColor:'black',
            borderStyle:'solid'
          }}>
      <form >
        <div className='form-fields'>
          <span style={{verticalAlign:'middle'}}><b>Add Task</b></span>
          <img style={{verticalAlign:'middle', cursor:'pointer'}} onClick={this.props.switchForm} src={image} height="10%" width="10%" />
        </div>
        <label className='form-fields'>
          Name:
          <input name="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
        </label>
        <label className='form-fields'>
          Subject:
          <select name="subject" value={this.state.subject} onChange={this.handleChange}>
            {subjectOptions}
          </select>
        </label>
        <label className='form-fields'>
          Description:
          <input name="taskDesc" type="text" value={this.state.taskDesc} onChange={this.handleChange} />
        </label>
        <label className='form-fields'>
          Type:
          <select name="taskType" value={this.state.taskType} onChange={this.handleChange}>
            {taskTypeOptions}
          </select>
        </label>
        <label className='form-fields'>
          Due Date: 
          <DatePicker
              selected={this.state.taskDueDate}
              onChange={(date)=>{this.setState({taskDueDate:date})}}
              showTimeSelect
              timeIntervals={15}
              dateFormat="M/D/YYYY [at] h:mm A"
              timeCaption="Time"
              shouldCloseOnSelect={true}
              minDate={moment()}
              maxDate={moment().add(100,'years')}
              showDisabledMonthNavigation
          />
        </label>
        <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
      </form>
      </div>  
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
