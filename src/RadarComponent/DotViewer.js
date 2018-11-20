import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MdModeEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { deleteTask, completeTask } from '../actions/assignmentAction.js'
import moment from 'moment'


const mapDispatchToProps = dispatch => ({
 deleteTask: (task) => dispatch(deleteTask(task)),
 completeTask : (data) => dispatch(completeTask(data))
})

const mapStateToProps = state => {
		return {
			id: state.user.user_id,
			subjects : state.assignment.subjects,
		}
	}

export class DotViewer extends Component {
	constructor(props) {
		super();
	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
	}

	completeAssignment() {
		if(this.props.dot && this.props.dot.id) {
			//let element = document.getElementById(this.props.dot.id)
			//if(element) element.setAttribute('visibility','hidden');
			//Replace this with API Call/Redux to update status of assignment to completed
			//completeAssignment(param,param) //this functions is not ready yet, uncomment when ready
			let assignment = this.props.dot.assignment;
			this.props.completeTask(assignment)
			//this.props.complete(assignment)
			//
			this.props.close();
		}
	}

	deleteAssignment() {
		if(this.props.dot && this.props.dot.id) {
			//let element = document.getElementById(this.props.dot.id)
			//if(element) element.setAttribute('visibility','hidden');
			//Replace this with API Call/Redux to delete assignment from user's account
			//removeSubject(param,param) //function is not ready yet, uncomment when ready
			let assignment = this.props.dot.assignment;
			this.props.deleteTask(assignment)
			//
			this.props.close();
		}
	}

	editAssignment() {
		if(this.props.dot && this.props.dot.id) {
			let assignment = this.props.dot.assignment;

			this.props.close();
			this.props.edit(assignment)
		}
	}




	render() {

		let x=0,y=0,fill,visibility = 'hidden',assignment = null;
		if(this.props.dot) {
			visibility = 'visible';
			fill = this.props.dot.fill;

			let width = 0, height = 0;
			let element = document.getElementById('dotViewer');
			if(element) {
				let rect = element.getBoundingClientRect();
				width = rect.width;
				height = rect.height;
			}

			x = this.props.dot.x - width/2;
			y = this.props.dot.y - height/2;

			//Needs to be reworked so that div is centered over the dot that is
			//clicked and so that the div doesn't spill over the edge of the screen

			/*if(x+width > window.innerWidth)
				x = Math.max(window.innerWidth - width, x - width);
			if(x < 0)
				x = 0;
			if(y+height > window.innerHeight)
				y = Math.max(window.innerHeight - height, y - height);
			if(y < 0)
				y = 0;*/
			assignment = this.props.dot.assignment;
		}
		let show = visibility === 'visible';

		let date = '', name = '', type = '';
		if(assignment) {
			name = assignment.name;
			date = ' ' + moment(assignment.dueDate).format('MMMM Do YYYY, h:mm a');
			type = ' ' + assignment.type;
		}

		return (

			<div id='dotViewer' style={
				{display:'block',
				position:'absolute',
				border:2, borderColor:'black', borderStyle:'solid', borderRadius:'15px',
				top:y,left:x,width:this.props.width,visibility:visibility, background:fill}}
				>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'15%',display:'inline-block',padding:5}}>
						<div style={{cursor:'pointer'}} onClick={this.props.close} height="100%" width="100%">
							<IconContext.Provider value={{size:25}}>
								<MdClose />
							</IconContext.Provider>
						</div>
					</div>
					<div style={{width:'15%',display:'inline-block',padding:5}}>
						<div style={{cursor:'pointer'}} onClick={this.editAssignment.bind(this)} height="100%" width="100%">
							<IconContext.Provider value={{size:25}}>
								<MdModeEdit />
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<div style={{display:'flex',justifyContent:'center'}}>
					<div style={{display:'inline-block',padding:5}}>
						<b style={{fontSize:'2.5vw'}}>{name}</b>
					</div>
				</div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{display:'inline-block',flexGrow:'2',padding:5}}>
						<p style={{fontSize:'2.5vw'}}><b>Due Date:</b>{date}</p>
					</div>
				</div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{display:'inline-block',flexGrow:'2',padding:5}}>
						<p style={{fontSize:'2.5vw'}}><b>Type:</b>{type}</p>
					</div>
				</div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'15%',display:'inline-block',padding:5}}>
						<div style={{cursor:'pointer'}} onClick={this.completeAssignment.bind(this)} height="100%" width="100%">
							<IconContext.Provider value={{size:25}}>
								<MdCheck />
							</IconContext.Provider>
						</div>
					</div>
					<div style={{display:'inline-block',flexGrow:'2',padding:5}}>
					</div>
					<div style={{width:'15%',display:'inline-block',padding:5}}>
						<div style={{cursor:'pointer'}} onClick={this.deleteAssignment.bind(this)} height="100%" width="100%">
							<IconContext.Provider value={{size:25}}>
								<MdDelete />
							</IconContext.Provider>
						</div>
					</div>
				</div>
			</div>

		);

		/*return (
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
				<text visible={visibility} strokeWidth="1" fontSize="14" x={x + 5} y={y + this.props.height / 2}>
				{taskText}
				</text>
			</g>
		);*/
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DotViewer)
