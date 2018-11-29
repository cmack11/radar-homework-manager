import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import moment from 'moment'
import TaskList from './RadarComponent/TaskList.js'
import image from './images/window_close.svg'
import { connect } from 'react-redux'
import { retrieveOverdueTasks } from './actions/assignmentAction.js'
import { MdClose } from 'react-icons/md'
import { IconContext } from "react-icons"


const mapDispatchToProps = dispatch => ({
 retrieveOverdueTasks: (user_id) => dispatch(retrieveOverdueTasks(user_id)),
})

const mapStateToProps = state => {
		return {
			id: state.user.user_id,
			overdueAssignments:state.assignment.overdueAssignments
		}
	}


const padding = 10;

class OverduePage extends Component {

	constructor(props) {
		super();

		let state = {
			top:100,
			left:100
		}

		this.state = state;
	}

	componentDidMount() {
    	this.resize();
  	}

	componentWillReceiveProps(nextProps){
		this.resize();
		if(nextProps.show && nextProps.show != this.props.show)
			this.props.retrieveOverdueTasks(this.props.id)
	}

	resize() {
	  let height = 307, width = this.props.width;//What it usually shows up as the first time
	  let e = document.getElementById('OverdueScreen');
	  if(e){
	      height = e.getBoundingClientRect().height;
	      width = e.getBoundingClientRect().width;
	  }

	  let top = this.props.y-height/2+40;
	  let left = this.props.x-width/2-padding;

	  this.setState({top:top, left:left} )
	}




	render() {

		let visible = this.props.show ? 'visible' : 'hidden';

	    return (
	    	<div id="OverdueScreen" style={{
	    			visibility:visible,
	    	        position:'absolute',
	    	        top:this.state.top,
	    	        left:this.state.left,
	    	        padding:padding,
	    	        width:'75%',
	    	        background:'#9C0720',
	    	        border:5,
	    	        borderColor:'#7a0317',
	    	        borderStyle:'solid',
                borderRadius:"5px",
	    	    }}>
	    	    <div style={{display:'flex'}}>
	    	      <div style={{cursor:'pointer'}} onClick={this.props.close}>
                <IconContext.Provider value={{size:30}}>
                  <MdClose />
                </IconContext.Provider>
              </div>
	    	      <span style={{verticalAlign:'middle',flexGrow:2,fontSize:'28px'}}><b>Overdue</b></span>
	    	    </div>
	    		<TaskList
	    			visible={this.props.show}
	    			useTypeColors={false}
	    			title=""
	    			noDataText="No Overdue Assignments Found"
	    			width={Math.min(window.innerWidth,500)}
	    			assignments={this.props.overdueAssignments}
	    			colors={this.props.colors}
	    			onResize={this.resize.bind(this)}
					showCompleteButton={true}
				/>
			</div>
	    )
  }
}


export default  connect(mapStateToProps, mapDispatchToProps)(OverduePage);
