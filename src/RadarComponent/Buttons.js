import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class Buttons extends Component {


	constructor(props) {
		super();
	}

	

	componentDidMount() {
		
	}

	componentWillUnmount() {

	}

	


	render() {
		if(!this.props.buttons) return null;

		let buttons = [];
		this.props.buttons.map((obj) => {
			buttons.push(<circle cx={obj.x} cy={obj.y} r={obj.radius} fill={obj.color} onClick={obj.onClick}/>)
		})

		return (
				<svg>
					{buttons}
				</svg>
		)
	}
}

export default Buttons;

