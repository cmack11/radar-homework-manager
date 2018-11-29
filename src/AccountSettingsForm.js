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
    }
  }

  const maxNameLength = 20;
  const minNameLength = 1;
  const maxPassword = 14;
  const minPasswordLength = 6;

export class AccountSettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() {
    let defaultState = {Name: 'PVT_Joe', Email: 'PVT_Joe@mail.mil', Password: 'EatsCrayons', focused:false};
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
    return true
  }

  render() {

    let formName = <b>Account Information</b>;
    let buttonName = <b>Save Changes</b>;
	  
    return (
      <div className="account-settings-form" style={{position: 'absolute', left: 0, top: 0, width: '80%', height: '80%', margin: '10%'}} onClick={(e) => {e.stopPropagation()}}>
      
      <Form >
        
        <div className="account-title-container" >
            {formName}
        </div>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Name</label>
          <input style={{borderColor:(this.state.NameError ? 'red': null)}} name="Name" type="text" value={this.state.Name} onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Email</label>
          <input name="Email" type="text" value={this.state.Email} onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Password</label>
          <input name="Password" type="text" value={this.state.Password} onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">New Password</label>
          <input name="Password" type="text" value="" onChange={this.handleChange} />
        </Form.Field>
        
        <Form.Field className='form-fields'>
          <label className="label-text label-center">Confirm New Password</label>
          <input name="Password" type="text" value="" onChange={this.handleChange} />
        </Form.Field>
        
        <Button primary type="button" value="Save Changes" onClick={this.handleSubmit}>{buttonName}</Button>
      </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsForm);
