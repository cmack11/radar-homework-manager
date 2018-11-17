import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {subjects1} from '../fakeData.js'
import moment from 'moment';

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

const padding = 0;
const dateCompare = function(a,b) {
    //console.log(a.dueDate.valueOf() - b.dueDate.valueOf());
    return moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf();
}

class TaskList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {visible: this.props.visible, top:307, left:200};
  }

  componentWillReceiveProps(nextProps){
    this.setState({visible:nextProps.visible})
    //if(nextProps.assignments && nextProps.assignments.length)
        //nextProps.assignments.sort(dateCompare);
  }

  componentDidMount() {
  }

  markComplete(assignment) {
    console.log("MARKED COMPLETE: " + assignment.name);
    //TODO: Add connection to Reducer
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
            accessor: 'subject'
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
            accessor: 'type'
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
            Cell: props => <span className='dueDate'>{moment(props.value).format("MM/DD/YYYY")}</span>
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
        }}>
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

export default TaskList;
