import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import { connect } from 'react-redux'
import { editType, editSubject } from './actions/assignmentAction.js'




const mapDispatchToProps = dispatch => ({
  editType : (user_id, type_id, name, color) => dispatch(editType(user_id, type_id, name, color)),
  editSubject : (newSubject) => dispatch(editSubject(newSubject))
})

const mapStateToProps = state => {
    return {
      id: state.user.user_id,
      subjects : state.assignment.subjects,
      types : state.assignment.typesDict,
    }
  }

export class SingleItemColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { showCP: false, color: this.getCurrentColor() };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleClick() {
    this.setState({ showCP: !this.state.showCP });
  }

  handleClose = () => {
    this.setState({ showCP: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({color:this.getCurrentColor(nextProps)});
  }

  getCurrentColor(props) {
    if(!props) props = this.props;

    if(!props.isSubject) {
      for(let key in props.types) {
        if(props.types[key].name === props.name)
          return props.types[key].color;
      }
    } else {
      for(let i = 0; i < props.subjects.length; i++) {
        if(props.subjects[i].name === props.name)
          return props.subjects[i].color;
      }
    }
    return '#000';
  }
  handleChangeColor(color, event) {
    if(!this.props.isSubject) {
      for(let key in this.props.types) {
        if(this.props.types[key].name === this.props.name) {
          let type = this.props.types[key];

          this.props.editType(this.props.id, type.type_id, type.name, color.hex)
        }
      }
    } else {
      for(let i = 0; i < this.props.subjects.length; i++) {
        if(this.props.subjects[i].name === this.props.name) {
          let subject = this.props.subjects[i];
          subject.color = color;

          this.props.editSubject(subject);
        }
      }
    }
    this.setState({ color: color.hex });
  }
  render() {
    const fullscreenCover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    return (<div style={{ background: this.state.color }}>
      <rect width="100%" height="100%" rx={15} ry={15} className={(this.state.color === "white" ? "type-border" : "" )}background={this.state.color} onClick={this.handleClick}><text style={{ color: "white" }}>{" " + this.props.name + " "}</text></rect>
      {this.state.showCP ?
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div style={fullscreenCover} onClick={this.handleClose} />
          <GithubPicker triangle={'hide'} onChangeComplete={this.handleChangeColor} />
        </div>
        : null}
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemColorSelect)
