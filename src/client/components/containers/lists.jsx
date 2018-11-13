import React from 'react';
import TableHeader from '../lists/TableHead';
import { push } from 'connected-react-router';
import { ListsAPI } from '../../services/ListServices';
import { TableBody } from '../lists/TableBody';
import TableFooter from '../../containers/TableFooter';
import { connect } from 'react-redux';
import { getQuery } from '../../utils/helper';

export const initState = { columnData: [], data: [] };

class ListsView extends React.Component {

	constructor(props) {
		super(props);
		this.dispatch = props.dispatch;
		this.listType = props.params.listType;
		this.fetchData();
	}

	fetchData = (listType) => {
		//const params = getQuery();
		const params = {$limit: 20, $skip: 0};
		this.dispatch({ type: 'fetchData', listType: this.listType, params });
	}

	onSearch = ({ col, value }) => {
		let params = getQuery();
		params = {
			...params,
			[col]: value
		};
		this.dispatch({ type: 'fetchData', listType: this.listType, params });
	}

	onSort = ({ col, asc }) => {
		let params = getQuery();
		params = {
			...params,
			$sort: (!asc ? '-' : '') + col
		};
		this.dispatch({ type: 'fetchData', listType: this.listType, params });
	}

  onEdit = () => {
    this.dispatch({type:'fetch_form'});
  }

	render() {
		const { lists } = this.props;
		return (
			<div>
				<table className="list-table">
					<TableHeader 
						columnData={lists.columnData}
						onSearch={this.onSearch}
						onSort={this.onSort}
					/>
					<TableBody 
						data={lists.data}
						columnData={lists.columnData}
            onEdit = {this.onEdit}
					/>
				</table>
				<table className="list-table">
					<TableFooter 
						currentFrom={lists.skip ? lists.skip+1 : "1"}  
						currentTo={lists.limit ? lists.skip+ lists.limit : "20"}  
						skip={lists.skip ? lists.skip : "0"}
						limit={lists.limit ? lists.limit : "20"}
						totalRecords={lists.total ? lists.total : "100"}
						listType={this.listType}
					/>
				</table>
			</div>
		);
	}
}

const dispatchToProps = (dispatch) => dispatch;

const ConnectedListsView = connect(dispatchToProps)(ListsView);

export default ConnectedListsView;
