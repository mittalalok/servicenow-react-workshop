import React from 'react';
import TableHeader from '../lists/TableHead';

// Temporary
const interviewersMeta = [{
	label: 'ID',
	type: 'id',
	searchable: true,
	sortable: true
}, {
	label: 'Name',
	type: 'name',
	searchable: true,
	sortable: true
}, {
	label: 'Email',
	type: 'email',
	searchable: true,
	sortable: true
}, {
	label: 'Mobile',
	type: 'mobile',
	searchable: true,
	sortable: true
}, {
	label: 'Date of Birth',
	type: 'date_of_birth',
	searchable: true,
	sortable: true
}, {
	label: 'Level',
	type: 'level',
	searchable: true,
	sortable: true
}, {
	label: 'Department',
	type: 'department',
	searchable: true,
	sortable: true
}, {
	label: 'Business Unit',
	type: 'business_unit',
	searchable: true,
	sortable: true
}];

const ListsView = () => {
	return (
		<div>
			<table class="list-table">
				<TableHeader columnData={interviewersMeta} />
				{/* <TableBody/> */}
				{/* <TableFooter/>  */}
			</table>
			
		</div>
	);
};

export default ListsView;
