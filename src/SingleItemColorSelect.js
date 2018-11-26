import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
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
  ;
  handleClose = () => {
    this.setState({ showCP: false });
  };
  getCurrentColor() {
    //Just check for this.props.isTaskType or this.props.isSubject to know.
    //TODO: Redux, get current color
    return '#000';
  }
  handleChangeColor(color, event) {
    //TODO: Redux change color. Just check for this.props.isTaskType or this.props.isSubject to know.
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
      <rect width="100%" height="100%" rx={15} ry={15} background={this.state.color} onClick={this.handleClick}><text style={{ color: "white" }}>{" " + this.props.name + " "}</text></rect>
      {this.state.showCP ?
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div style={fullscreenCover} onClick={this.handleClose} />
          <GithubPicker triangle={'hide'} onChangeComplete={this.handleChangeColor} />
        </div>
        : null}
    </div>);
  }
}