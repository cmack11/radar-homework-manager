import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {subjects1} from '../fakeData.js'
import moment from 'moment';
import { connect } from 'react-redux'
import { completeTask } from '../actions/assignmentAction.js'
import { setTaskDivRef } from '../dismissCenter';

/*
TaskList props:
    visible = true/false - defaults true
    title = String (This title will be shown above the table)
    width
    height
    hideSubjectCol = true/false - defaults to false
    assignments = array of assignments to display.
        assignments should have a .name, .subject, .description, .type, and .dueDate (moment)
    showCompleteButton = true/false
*/

const mapDispatchToProps = dispatch => ({
 completeTask : (task) => dispatch(completeTask(task))
})

const mapStateToProps = state => {
        return {
            id: state.user.user_id,
            subjects : state.assignment.subjects,
            types:state.assignment.typesDict
        }
    }

const padding = 0;
const dateCompare = function(a,b) {
    //console.log(a.dueDate.valueOf() - b.dueDate.valueOf());
    return moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf();
}

export class TaskList extends React.Component {


  constructor(props) {
    super();
    this.state = {visible: props.visible, top:307, left:200};
  }

  componentWillReceiveProps(nextProps){
    this.setState({visible:nextProps.visible})
    //if(nextProps.assignments && nextProps.assignments.length)
        //nextProps.assignments.sort(dateCompare);
  }

  componentDidMount() {
  }

  markComplete(assignment) {
    if(this.props.completeTask)
        this.props.completeTask(assignment)
  }

  getTrProps(state, rowInfo, column) {
    if(!rowInfo) return {};
    let color = 'none';
    if(this.props.useTypeColors) {
        let type = rowInfo.original.type;
        if(this.props.colors && this.props.colors[type])
            color = this.props.colors[type];
    } else {
        let subject = rowInfo.original.subject;
        if(this.props.colors && this.props.colors[subject])
            color = this.props.colors[subject];
    }

    return {
        style:{
            background:'darkgrey',
            color:color
        }
    }
  }

  getTdProps(state, rowInfo, column, instance) {
    if( !rowInfo || (column && column.id !== 'type')) return {};

    let color = "none";
    let type = rowInfo.original.type;

    if(this.props.colors && this.props.colors[type]) {
        color = this.props.colors[type];
        return {
            style:{
                color:color,
                fontWeight:'bold'
            }
        };
    }


    return {}
  }

  getColumns() {
    let hideSubjectCol = this.props.hideSubjectCol !== undefined && this.props.hideSubjectCol;
    let columns = [];
    columns.push(
        {
            Header: 'Name',
            accessor: 'name'
        });
    if (!hideSubjectCol)
    {
        columns.push(
        {
            Header: 'Subject',
            accessor: 'subject_id',
            Cell: props => {
                let name = '';
                for(let i = 0; this.props.subjects && i < this.props.subjects.length; i++)
                    if(this.props.subjects[i].subject_id === props.value)
                        name = this.props.subjects[i].name
                return <span className='type_id'>{name}</span>
            }

        });
    }
    columns.push.apply(columns,
    [
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Type',
            accessor: 'type',//change to type_id when fixed
            Cell: props => <span className='type_id'>{(this.props.types && this.props.types[props.value]) ? this.props.types[props.value].name : ''}</span>
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
            Cell: props => <span className='dueDate'>{moment(props.value).format("MMMM Do YYYY, h:mm a")}</span>
        },
    ]);
    if (this.props.showCompleteButton)
    {
        columns.push(
        {
            Header: 'Complete',
            accessor: '',
            Cell: props => <button onClick={() => this.markComplete(props.value)}>Complete</button>
        });
    }

    return columns;
  }

  render() {
    let columns = this.getColumns();

    const data = this.props.assignments; //!== undefined ? this.props.assignments : subjects1[0].assignments;
    let visible = this.state.visible ? 'visible' : 'hidden';
    return (
    <div id="tasklist" style={{
            visibility:visible,
            padding:padding
        }}
         ref={node => setTaskDivRef(node)}
        >
        {this.props.title}
        <ReactTable
            getProps={()=>{return {style:{background:'lightgrey'}}}}
            getTrProps={this.getTrProps.bind(this)}
            getTdProps={this.getTdProps.bind(this)}
            noDataText={this.props.noDataText}
            data={data}
            columns={columns}
            defaultPageSize={5}
            pageSizeOptions = {[5, 10, 15]}
            onPageSizeChange={(pageIndex) => {this.props.onResize()}}
        />
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
