import React from 'react';
import { connect } from 'react-redux';
import { retrieveTasks, newTask, editTask } from '../actions/assignmentAction.js';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import image from '../images/switch_form.png'
import {Button, Form} from 'semantic-ui-react';
import { MdRepeat} from 'react-icons/md';
import { IconContext } from 'react-icons';
import {DATE_FORMAT} from '../config/config.js'


const mapDispatchToProps = dispatch => ({
 retrieveTasks: () => dispatch(retrieveTasks()),
 newTask: (name,description,type,dueDate, subject_id, user_id) => dispatch(newTask(name,description,type,dueDate, subject_id, user_id)),
 editTask: (updatedTask) => dispatch(editTask(updatedTask)),
})

const mapStateToProps = state => {
    return {
      id: state.user.user_id,
      subjects: state.assignment.subjects
    }
  }

  const maxNameLength = 20;
  const minNameLength = 1;

export class TaskForm extends React.Component {
  constructor(props) {
    super(props);

   if(this.props.isEditForm == true){
    this.state = this.getEditState();
   }else{
      this.state = this.getDefaultState();
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() {
    let defaultState = {taskName: '', taskDesc: '', taskType:'Assignment', taskDueDate:moment().add(1,'hours').minutes(0).seconds(0), subject: '', focused:false};
    return defaultState;
  }

  getEditState() {
      let defaultState = {taskName: this.props.assignment.name, taskDesc: this.props.assignment.description,
taskType: this.props.assignment.type, taskDueDate: moment(this.props.assignment.dueDate), subject: this.props.assignment.subject, focused:false};
      return defaultState;
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if(name === 'taskName') {
      if(value.length > 0)
        this.setState({taskNameError:false});
      else
        this.setState({taskNameError:true});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if(!this.allValid()) return;

    let subject = this.state.subject;
    if (!subject || subject === '')
      subject = this.props.subjectNames[0];


	if(!this.props.isEditForm){
    this.props.newTask(this.state.taskName,
                              this.state.taskDesc,
                              this.state.taskType,
                              this.state.taskDueDate.format(DATE_FORMAT),
                              this.props.subjects.filter(sub => sub.name.toLowerCase() === subject.toLowerCase())[0].subject_id,
                              this.props.id)

    this.setState(this.getDefaultState());
  } else {

    let assignment = this.props.assignment;
    assignment.name = this.state.taskName;
    assignment.description = this.state.taskDesc;
    assignment.type = this.state.taskType;
    assignment.dueDate = this.state.taskDueDate.format(DATE_FORMAT)
    console.log(this.state)
    let subject_id;
    for(let i = 0; i < this.props.subjects.length && !subject_id; i++) {
      let s = this.props.subjects[i];
      for(let j = 0; j < s.assignments.length && !subject_id; j++) {
        let a = s.assignments[j];
        if(a.task_id === assignment.task_id)
          subject_id = s.subject_id;
      }
    }

    let user_id = this.props.id;

    this.props.editTask(assignment,subject_id,user_id);

    this.setState(this.getDefaultState());
  }

  if(this.props.closeForm)
    this.props.closeForm();
}

  allValid() {
    if(this.state.taskName === "" || this.state.taskName.length > maxNameLength || this.state.taskName.length < minNameLength) {
      this.setState({taskNameError:true});
      return false;
    }
    return true
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

    let formName = <b>Add Task</b>;
    let buttonName = <b>Submit</b>;
    let switchForm =  <div className="switch-icon" onClick={this.props.switchForm}>
                        <IconContext.Provider value={{size:20}}>
                          <MdRepeat />
                        </IconContext.Provider>
                      </div>;

     if(this.props.isEditForm) {
      formName = <b>Edit Task</b>;
      buttonName = <b>Save Changes</b>;
      switchForm = null;
    }

    return (
      <div className="subject-task-form">
      <Form >
        <div className="subject-title-container">
            {formName}
            {switchForm}            
        </div>
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Name</label>
          <input style={{borderColor:(this.state.taskNameError ? 'red': null)}} name="taskName" type="text" value={this.state.taskName} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Subject</label>
          <select name="subject" value={this.state.subject} onChange={this.handleChange}>
            {subjectOptions}
          </select>
        </Form.Field>
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Description</label>
          <input name="taskDesc" type="text" value={this.state.taskDesc} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Task Type</label>
          <select name="taskType" value={this.state.taskType} onChange={this.handleChange}>
            {taskTypeOptions}
          </select>
        </Form.Field>
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Due date</label>
          <DatePicker
              selected={this.state.taskDueDate}
              onChange={(date)=>{this.setState({taskDueDate:date})}}
              onChangeRaw={(e) => {
                let d = moment(e.target.value,"M/D/YYYY [at] h:mm A");
                if(!d.isValid()) return;
                console.log(d.format())
                this.setState({taskDueDate:d});
              }}
              showTimeSelect
              disabledKeyboardNavigation
              timeIntervals={15}
              dateFormat="M/D/YYYY [at] h:mm A"
              timeCaption="Time"
              shouldCloseOnSelect={true}
              minDate={moment()}
              maxDate={moment().add(100,'years')}
              showDisabledMonthNavigation
          />
        </Form.Field>
        <Button primary type="button" value="Submit" onClick={this.handleSubmit}>{buttonName}</Button>
      </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
