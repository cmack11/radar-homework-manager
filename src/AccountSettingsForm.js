import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import {Button, Form} from 'semantic-ui-react';
import './App.css';
import { changeName } from './actions/userAction.js';

const mapDispatchToProps = dispatch => ({
  changeName: (data) => dispatch(changeName(data)),
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState() {
    let defaultState = {Name: this.props.name, Email: this.props.email, focused:false};
    return defaultState;
  }

  handleSubmit(event) {

    if (this.refs.newName.value == this.props.name)
      return

    this.props.changeName(this.refs.newName.value)
    //call redux function to pass new name and password to database
}

  render() {

    return (
      <div style={{position: 'absolute', left: "15%", top: 0, width: '50%', height: '80%', margin: '10%', fontSize:16}} >
        <div className="account-info-container" >
         	<b>Account Information</b>
        </div>
        <Form>
        <Form.Field className='form-fields'>
          <label className="label-text label-center"> Name:  </label>
          <label> {this.state.Name} </label>
        </Form.Field>

        <Form.Field className='form-fields'>
          <label className="label-text label-center">Email:</label>
          <label>  {this.state.Email} </label>
        </Form.Field>
        <br />

        <div className="account-edit-container">
        		<b>Edit Account Information</b>
        </div>
        <br />

        <Form.Field className='form-fields'>
          <label className="label-text label-center">New Name:</label>
          <input ref="newName"/>
        </Form.Field>

        <Form.Field className='form-fields'>
          <label className="label-text label-center">New Password:</label>
          <input type="password" ref="newPass"/>
        </Form.Field>

        <Form.Field className='form-fields'>
          <label className="label-text label-center">Confirm New Password:</label>
          <input type= "password" ref="confirmPass"/>
        </Form.Field>

        <Button primary type="button" value="Save Changes" onClick={this.handleSubmit}><b>Save Changes</b></Button>
        </Form>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsForm);
