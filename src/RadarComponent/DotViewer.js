import React, { Component } from 'react';

class DotViewer extends Component {


	constructor(props) {
		super();
	}

	componentDidMount() {
		
	}

	
	render() {

		let x,y,fill,visibility = 'hidden';
		if(this.props.dot) {
			visibility = 'visible';
			fill = this.props.dot.fill;

			x = this.props.dot.x - this.props.width/2;
			y = this.props.dot.y - this.props.height/2;
		
			if(x+this.props.width > window.innerWidth)
				x = Math.max(window.innerWidth - this.props.width, this.props.dot.x - this.props.width);
			if(x < 0)
				x = 0;
			if(y+this.props.height > window.innerHeight)
				y = Math.max(window.innerHeight - this.props.height, this.props.dot.y - this.props.height);
			if(y < 0)
				y = 0;
		}
		let show = visibility === 'visible';
		let taskText = show ? this.props.dot.assignment.type + ": " + this.props.dot.assignment.name + " (" + this.props.dot.assignment.dueDate.format("MM/DD/YYYY") + ")" : "";

		return (
			<g>
				<rect id='dotViewer' 
					width={this.props.width} 
					height={this.props.height} 
					rx={15} ry={15}
					fill={fill}
					stroke='black'
					x={x} y={y}
					visibility={visibility}
					onClick={this.props.closeDotViewer}/>
				<text stroke-width="1" font-size="14" x={x + 5} y={y + this.props.height / 2}>
				{taskText}
				</text>	
			</g>
		);
	}
}

export default DotViewer;