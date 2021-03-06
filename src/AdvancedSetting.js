import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import {subjects1} from './fakeData.js';
import { retrieveTypes, editType, newType } from './actions/assignmentAction.js'
import './App.css';
import TaskTypeEditor from './TaskTypeEditor';
import ColorSettingsRow from './ColorSettingsRow';


const mapDispatchToProps = dispatch => ({
 retrieveTypes: (id) => dispatch(retrieveTypes(id)),
 newType : (user_id, name, color) => dispatch(newType(user_id, name, color)),
 editType : (user_id, type_id, name, color) => dispatch(editType(user_id, type_id, name, color))
})

const mapStateToProps = state => {
  return {
    id: state.user.user_id,
    types : state.assignment.typesDict,
  }
}

class AdvancedSetting extends React.Component {

  componentDidMount() {
    this.props.retrieveTypes(this.props.id)
  }

  getTaskTypes() {

    let arr = [];
    if(this.props.types) {
      for(let key  in this.props.types) {
        arr.push(this.props.types[key])
      }
    }
    return arr;
  }

render() {
  return (
    <div style={{position: 'absolute', left: '25%', top: 0, width: '50%', height: '80%', marginTop: '1%'}}>
      <div>
        <p className="adv-title">Advanced Setting</p>
      </div>
      <div style={{display: 'table', width: '100%'}}>
        <ColorSettingsRow items = {subjects1} isSubject={true}/>
        <br/>
        <ColorSettingsRow items = {this.getTaskTypes()} isTaskType={true}/>
      </div>
      <br/>
      <br/>
      <TaskTypeEditor taskTypes={this.getTaskTypes()}/>
    </div>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSetting);
