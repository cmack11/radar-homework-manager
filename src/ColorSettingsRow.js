import React, { Component } from 'react';
import { SingleItemColorSelect } from "./SingleItemColorSelect";
export class ColorSettingsRow extends Component {
  getItems() {
    if (this.props.isSubject)
      return this.getSubjects();
    else
      return this.getTaskTypes();
  }
  getSubjects() {
    //TODO: Redux Connection. Items won't be used once Redux is hooked in.
    return this.props.items;
  }
  getTaskTypes() {
    //TODO: Redux Connection. Items won't be used once Redux is hooked in.
    return this.props.items;
  }
  render() {
    const items = this.getSubjects();
    let itemsList = [];
    for (var i = 0; i < items.length; i++) {
      itemsList.push(<span style={{ display: 'table-cell' }}>
        <SingleItemColorSelect name={items[i].name} isSubject={this.props.isSubject} />
      </span>);
    }
    return (<div style={{ display: 'table-row' }}>
      <text><b>{this.props.isSubject ? "Subject" : "Task Type"} Color Selection: </b></text>
      {itemsList}
    </div>);
  }
}