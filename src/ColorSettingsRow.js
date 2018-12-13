import React, { Component } from 'react';
import SingleItemColorSelect from "./SingleItemColorSelect";
import { connect } from 'react-redux'
import { addType } from './actions/assignmentAction.js'




const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = state => {
    return {
      id: state.user.user_id,
      subjects : state.assignment.subjects,
      types : state.assignment.typesDict,
    }
  }

export class ColorSettingsRow extends Component {
  
  render() {
    let items;
    if(this.props.isSubject)
      items = this.props.subjects;
    else {
      items = [];
      for(let key in this.props.types)
        items.push(this.props.types[key])
    }
    let itemsList = [];
    for (var i = 0; i < items.length; i++) {
      itemsList.push(<span style={{ cursor: 'pointer', display: 'table-cell' }}>
        <SingleItemColorSelect name={items[i].name} isSubject={this.props.isSubject} />
      </span>);
    }
    return (<div style={{ display: 'table-row' }}>
      <text><b>{this.props.isSubject ? "Subject" : "Task Type"} Color Selection: </b></text>
      {itemsList}
    </div>);
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ColorSettingsRow)