import React, { Component } from 'react';
import Dot from './Dot.js'
//import moment from 'moment'
//import PropTypes from 'prop-types';

class DraggedDot extends Component {


	constructor(props) {
		super();
		let state = {
			point:{x:0,y:0},
		}
		this.state = state; 
		this.mouseMove = this.mouseMove.bind(this);
	}


	componentDidMount() {
		
	}

	componentWillUnmount() {

	}

	componentWillReceiveProps(newProps) {
		if(newProps.dot) {
			this.setState({fill:newProps.dot.dot.getAttribute('fill')})
			window.addEventListener('mousemove',this.mouseMove)
		} else {
			window.removeEventListener('mousemove',this.mouseMove)
			this.setState({point:{x:-1,y:-1}})
		}
	}

	mouseMove(e) {
		let dotsGroup = document.getElementById('dotsGroup');
		dotsGroup.insertBefore(this.props.dot.dot,null);

		let x = e.offsetX;
		let y = e.offsetY;
		this.setState({point:{x:x,y:y}})
	}


	render() {

		if(!this.props.dot || this.state.point.x < 0 || this.state.point.y < 0) return null;

		return (
			<Dot center={this.state.point} radius={40} fill={this.state.fill} 
				animateFades={false} />
		)
	}
}

export default DraggedDot;

//need to find a way to have the dragged dot be on top of the spinline, but stationary dots be below
//And also have dotviewer be on top of spinline

