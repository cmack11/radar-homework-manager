import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {Button, Form} from 'semantic-ui-react';

const mapDispatchToProps = dispatch => ({
 //TODO
})

const mapStateToProps = state => {
    return {
      id: state.user.user_id,
      name: state.user.name,
      email: state.user.email
    }
  }

  const maxNameLength = 20;
  const minNameLength = 1;
  const maxPasswordLength = 14;
  const minPasswordLength = 6;

export class AccountSettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() {
    let defaultState = {Name: this.props.name, Email: this.props.email, focused:false};
    return defaultState;
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if(name === 'Name') {
      if(value.length > 0)
        this.setState({NameError:false});
      else
        this.setState({NameError:true});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if(!this.allValid()) return;
    
    //call redux function to pass new name and password to database
    
	/*
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

    //console.log("New subject is " + JSON.stringify(d))
    this.props.newAssignment(d);
    this.setState(this.getDefaultState());
    if(this.props.closeForm)
    	this.props.closeForm();
  	}else{
  		this.props.addAssignment(
      	{subject:this.state.subject, name:this.state.taskName, description:this.state.taskDesc, type:this.state.taskType, dueDate:this.state.taskDueDate},
      	this.state.subject);
      	this.setState(this.getDefaultState());
      	if(this.props.closeForm)
        		this.props.closeForm();
  	}
    let user_id = this.props.id;

    this.props.editTask(assignment,subject_id,user_id);

    this.setState(this.getDefaultState());
    */
}


  allValid() {
    if(this.state.Name === "" || this.state.Name.length > maxNameLength || this.state.Name.length < minNameLength) {
      this.setState({NameError:true});
      return false;
    }
    if(this.state.Password === "" || this.state.Password.length > maxPasswordLength || this.state.Password.length < minPasswordLength) {
      this.setState({PasswordError:true});
      return false;
    }
    return true
  }

  render() {
	  
    return (
      <div className="account-settings-form" style={{position: 'absolute', left: 0, top: 0, width: '80%', height: '80%', margin: '10%'}} onClick={(e) => {e.stopPropagation()}}>
      
      <Form >
        
        <div className="account-info-container" >
         	<b>Account Information</b>  
        </div>
        <br />
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center"> Name:  {this.state.Name}</label>
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Email:  {this.state.Email}</label>
        </Form.Field>
        <br />
        
        <div className="account-edit-container">
        		<b>Edit Account Information</b>
        </div>
        <br />
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">New Name:</label>
          <input name="Name" type="text" value="" onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">New Password:</label>
          <input name="Password" type="text" value="" onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Confirm New Password:</label>
          <input name="Password" type="text" value="" onChange={this.handleChange} />
        </Form.Field>
        
        <Button primary type="button" value="Save Changes" onClick={this.handleSubmit}><b>Save Changes</b></Button>
      </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsForm);
