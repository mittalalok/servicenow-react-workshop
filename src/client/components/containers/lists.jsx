import React from 'react';
import TableHeader from '../lists/TableHead';
import { CandidatesAPI } from '../services/ListServices';
import { TableBody } from '../lists/TableBody';

// Temporary
const interviewersMeta = [{
	label: 'ID',
	id: 'id',
	searchable: true,
	sortable: true
}, {
	label: 'Name',
	id: 'name',
	searchable: true,
	sortable: true
}, {
	label: 'Email',
	id: 'email',
	searchable: true,
	sortable: true
}, {
	label: 'Mobile',
	id: 'mobile',
	searchable: true,
	sortable: true
}, {
	label: 'Date of Birth',
	id: 'date_of_birth',
	searchable: true,
	sortable: true
}, {
	label: 'Level',
	id: 'level',
	searchable: true,
	sortable: true
}, {
	label: 'Department',
	id: 'department',
	searchable: true,
	sortable: true
}, {
	label: 'Business Unit',
	id: 'business_unit',
	searchable: true,
	sortable: true
}];

const CandidatesMeta = [{
	id: 'name',
	label: 'Name',
	searchable: true,
	sortable: true
}, {
	id: 'email',
	label: 'Email',
	searchable: true,
	sortable: true
}, {
	id: 'mobile',
	label: 'Mobile',
	searchable: true,
	sortable: true
}, {
	id: 'qualification',
	label: 'Qualification',
	searchable: true,
	sortable: false
}, {
	id: 'current_employer',
	label: 'Current Employer',
	searchable: true,
	sortable: true
}, {
	id: 'current_role',
	label: 'Current Role',
	searchable: true,
	sortable: true
}, {
	id: 'skills',
	label: 'Skills',
	searchable: true,
	sortable: false
}];

class ListsView extends React.Component {

	constructor(props) {
		super(props);
		this.state = { columnData: CandidatesMeta };
		this.fetchData();
	}

	fetchData = (params) => {
		CandidatesAPI.get(params).then(res => {
			this.setState({ listData: res });
		})
	}

	onSearch = ({ col, value }) => {
		// TODO: Debounce this event
		this.fetchData({ [col]: value });
	}

	onSort = ({ col, asc }) => {
		this.fetchData({ $sort: (!asc ? '-' : '') + col });
		this.setState((prevState) => {
			return {
				columnData: prevState.columnData.map(column => {
					if (column.id === col) column.sortOrder = asc;
					return column;
				})
			}
		})
	}

	render() {
		return (
			<div>
				<table className="list-table">
					<TableHeader 
						columnData={this.state.columnData} 
						onSearch={this.onSearch}
						onSort={this.onSort}
					/>
					<TableBody 
						data={this.state.listData ? this.state.listData.data : null} 
						columnData={this.state.columnData}
					/>
					{/* <TableFooter/>  */}
				</table>
			</div>
		);
	}
}

export default ListsView;
