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
		this.mouseUp = this.mouseUp.bind(this);
	}


	componentDidMount() {
	}

	componentWillUnmount() {

	}

	componentWillReceiveProps(newProps) {
		if(newProps.dot) {
			this.setState({fill:newProps.dot.dot.getAttribute('fill')})
			window.addEventListener('mousemove',this.mouseMove)
			window.addEventListener('mouseup',this.mouseUp)
		} else {
			if(this.props.dot)
				this.oldDot = this.props.dot
		}
	}

	mouseUp(e) {
		this.checkIntersectFunctions(this.state.point.x,this.state.point.y);
		window.removeEventListener('mouseup',this.mouseUp)
		window.removeEventListener('mousemove',this.mouseMove)
		this.setState({point:{x:-1,y:-1}})
	}

	checkIntersectFunctions(x,y) {
		if(!this.props.intersectFunctions) return;
		this.props.intersectFunctions.forEach((obj) => {
			if(obj.rect && obj.func) {
				if(x <= obj.rect.x+obj.rect.width && x >= obj.rect.x 
					&& y <= obj.rect.y+obj.rect.height && y >= obj.rect.y)
						obj.func(this.oldDot);
			}
		})
	}

	pauseEvent(e){
	    if(e.stopPropagation) e.stopPropagation();
	    if(e.preventDefault) e.preventDefault();
	    e.cancelBubble=true;
	    e.returnValue=false;
	    return false;
	}

	mouseMove(e) {
		this.pauseEvent(e)
		let dotsGroup = document.getElementById('dotsGroup');
		dotsGroup.insertBefore(this.props.dot.dot,null);

		let top = document.getElementById('radarScreen');
		let rect = top.getBoundingClientRect();

		let style = top.currentStyle || window.getComputedStyle(top);
		let yOffset = rect.height+parseInt(style.getPropertyValue('margin-top'));
		let x = e.clientX;
		let y = e.clientY-yOffset;
		this.setState({point:{x:x,y:y}})
	}


	render() {

		if(!this.props.dot || this.state.point.x < 0 || this.state.point.y < 0 || this.props.radius < 0) return null;

		return (
			<Dot center={this.state.point} radius={this.props.radius} fill={this.state.fill} 
				animateFades={false} />
		)
	}
}

export default DraggedDot;

//need to find a way to have the dragged dot be on top of the spinline, but stationary dots be below
//And also have dotviewer be on top of spinline

