import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {subjects1} from '../fakeData.js'

/*
TaskList props:
    visible = true/false - defaults true
    title = String (This title will be shown above the table)
    width
    height
    hideSubjectCol = true/false - defaults to false
    assignments = array of assignments to display.
        assignments should have a .name, .subject, .description, .type, and .dueDate (moment)
*/

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    let visible = true;
    if (this.props.visible !== undefined && !this.props.visible)
        visible = false;
    this.state = {visible: visible};
  }

  render() {
    if (!this.state.visible)
        return(<null />);

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
            Cell: props => <span className='dueDate'>{props.value.format("MM/DD/YYYY")}</span>
        }
    ]);

    const data = this.props.assignments !== undefined ? this.props.assignments : subjects1[0].assignments;

    return (
    <div style={{
            width:this.props.width,
            height:this.props.height,
            padding:20
        }}>
        {this.props.title}
        <ReactTable
            data={data}
            columns={columns} 
            defaultPageSize={5}
            pageSizeOptions = {[5, 10, 15]}
        />
    </div>  
    );
  }
}

export default TaskList;
