import React from 'react';
import TaskForm from './TaskForm.js'
import SubjectForm from './SubjectForm.js'


const TASK_FORM = 'TaskForm';
const SUBJECT_FORM = 'SubjectForm';

export class AddForm extends React.Component {

  constructor(props) {
    super();

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    let defaultState = {form:SUBJECT_FORM};
    return defaultState;
  }

  switchForm() {
    if(this.state.form === TASK_FORM)
      this.setState({form:SUBJECT_FORM})
    else if(this.state.form === SUBJECT_FORM)
      this.setState({form:TASK_FORM})
  }

  render() {

    if(!this.props.show) return null;
    let form;

     if(this.state.form === TASK_FORM) 
      form = <TaskForm width={320} taskTypes={this.props.taskTypes} subjectNames={this.props.subjectNames} switchForm={this.switchForm.bind(this)} isEditForm={false}/>
    else if(this.state.form === SUBJECT_FORM)
      form = <SubjectForm width={320} taskTypes={this.props.taskTypes} switchForm={this.switchForm.bind(this)}/> 
    return (
      <div style={{position:'absolute',bottom:0,right:0}} id='subjectButton'>
      {form}
      </div>
    );
  }
}

export default AddForm
