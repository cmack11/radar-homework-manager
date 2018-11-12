import React from 'react';
import { connect } from 'react-redux';
import { retrieveAssignments, addSubject } from '../actions/assignmentAction.js';

const mapDispatchToProps = dispatch => ({
 retrieveAssignments: () => dispatch(retrieveAssignments()),
 addSubject: (subject) => dispatch(addSubject(subject))
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

const maxNameLength = 14;
const maxSubjectLength = 8;

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

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('The following Subject was submitted: ' + this.state.subjectName);
    let colors = ['red','blue','green','orange','black','magenta','maroon','cyan'];
    let index = Math.floor(Math.random() * colors.length);
    let color = colors[index];

    if(!this.allValid()) return; 

    this.props.addSubject(
      {name:this.state.subjectName, color:color, assignments:[], description:this.state.subjectDesc, defaultType:this.state.defaultTaskType});

    this.setState(this.getDefaultState())
    if(this.props.closeForm)
      this.props.closeForm();
  }

  allValid() {
    if(this.state.subjectName && this.state.subjectName.length > maxNameLength)
      return false;
    if(this.props.subjectNames) {
      if(this.props.subjectNames.length === maxSubjectLength) return false;
      let duplicate = false;
      duplicate = this.props.subjectNames.some((name)=>{
        return name.toLowerCase() === this.state.subjectName.toLowerCase();
      })
      if(duplicate) return false;
    }


    return true;
  }

  getDefaultState() {
    return {subjectName:'', subjectDesc:'', defaultTaskType: 'Assignment'};
  }

  render() {

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
          right:(window.innerWidth-this.props.width)/2,
          bottom:(window.innerHeight-150)/2,
          padding:20
        }}>
      <form >
        <b className='form-fields' onClick={this.props.switchForm}>Add Subject</b>
        <label className='form-fields'>
          Subject Name:
          <input name="subjectName" type="text" value={this.state.subjectName} onChange={this.handleChange} />
        </label>
        <label className='form-fields'>
          Subject Description:
          <input name="subjectDesc" type="text" value={this.state.subjectDesc} onChange={this.handleChange} />
        </label>
        <label className='form-fields'>
          Default Task Type:
          <select name="defaultTaskType" value={this.state.defaultTaskType} onChange={this.handleChange}>
            {taskTypeOptions}
          </select>
        </label>
        <button type="button" value="Submit" onClick={this.handleSubmit}>Submit</button>
      </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);
