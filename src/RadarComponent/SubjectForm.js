import React from 'react';
import { connect } from 'react-redux';
import { newSubject } from '../actions/assignmentAction.js';
import {Button, Form} from 'semantic-ui-react';
import { MdRepeat} from 'react-icons/md';
import { IconContext } from 'react-icons';


const mapDispatchToProps = dispatch => ({
 newSubject: (name, color, description, default_type_id, user_id) => dispatch(newSubject(name, color, description, default_type_id, user_id))
})

const mapStateToProps = state => {
    console.log("Map :"+ JSON.stringify(state));
    return {
      id: state.user.user_id,
      assignmentData : state.assignment.subjects,
      types: state.assignment.typesDict
    }
  }

const maxNameLength = 14;
const maxSubjectLength = 8;
const minNameLength = 1;

export class SubjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if(name === 'subjectName') {
      if(value.length > 0)
        this.setState({subjectNameError:false});
      else
        this.setState({subjectNameError:true});
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('The following Subject was submitted: ' + this.state.subjectName);
    let colors = ['blue','violet','orange','purple','darkgreen','cyan','maroon','yellow'];
    let index = this.props.subjectNames.length;
    let color = colors[index];

    if(!this.allValid()) return;

    let default_type_id = 0;
    for(let key in this.props.types) {
      if(this.props.types[key].name === this.state.defaultTaskType)
        default_type_id = this.props.types[key].type_id
    }

    this.props.newSubject(this.state.subjectName, color, this.state.subjectDesc, default_type_id, this.props.id)

    this.setState(this.getDefaultState())
    if(this.props.closeForm)
      this.props.closeForm();
  }

  allValid() {
    if(!this.state.subjectName || this.state.subjectName.length > maxNameLength || this.state.subjectName.length < minNameLength) {
      this.setState({subjectNameError:true})
      return false;
    }
    if(this.props.subjectNames) {
      if(this.props.subjectNames.length === maxSubjectLength) return false;
      let duplicate = false;
      duplicate = this.props.subjectNames.some((name)=>{
        return name.toLowerCase() === this.state.subjectName.toLowerCase();
      })
      if(duplicate) {
        this.setState({subjectNameError:true})
        return false;
      }
    }


    return true;
  }

  getDefaultState() {
    return {subjectName:'', subjectDesc:'', defaultTaskType: 'Assignment'};
  }

  render() {

    let taskTypeOptions = [];
    for (let key in this.props.types)
    {
      const taskType = this.props.types[key];
      taskTypeOptions.push(<option value={taskType.name}>{taskType.name}</option>);
    }

    return (
      <div className="subject-task-form"  onClick={(e) => {e.stopPropagation()}}>
        <Form >
            <div className="subject-title-container">
              <b>Add Subject</b>
              <div className="switch-icon" onClick={this.props.switchForm}>
                <IconContext.Provider value={{size:20}}>
                  <MdRepeat />
                </IconContext.Provider>
              </div>
            </div>
            <Form.Field className='form-fields'>
              <label className="label-text label-center">Subject Name</label>
              <input style={{borderColor:(this.state.subjectNameError ? 'red': null)}} name="subjectName" type="text" value={this.state.subjectName} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='form-fields'>
              <label  className="label-text">Subject Description</label>
              <input name="subjectDesc" type="text" value={this.state.subjectDesc} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field className='form-fields'>
              <label  className="label-text">Default Task Type</label>
              <select name="defaultTaskType" value={this.state.defaultTaskType} onChange={this.handleChange}>
                {taskTypeOptions}
              </select>
            </Form.Field>
            <Button primary type="button" value="Submit" onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
