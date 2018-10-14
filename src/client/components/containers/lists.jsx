import React from 'react';
import TableHeader from '../lists/TableHead';
import { push } from 'connected-react-router';
import { ListsAPI } from '../services/ListServices';
import { TableBody } from '../lists/TableBody';
import { connect } from 'react-redux';
import * as allListsSchema from './allLists';

export const initState = { columnData: [], data: [] };

const queryString = (queryObj) => {
    return Object.keys(queryObj).map(key => {
        return key + '=' + queryObj[key];
    }).join('&');
};

const queryObj = (queryString) => {
	if (!queryString) return {};

	return queryString
		.split('&')
		.map(param => param.split('='))
		.reduce((query, param) => ({
			...query,
			[param[0]]: param[1]
		}), {});
};

const fetchDataMiddleWare = (store, next, action) => {
	const query = queryString(action.params);
	ListsAPI.get(action.listType, query).then(res => {
		action.data = res;
		window.location.hash = `#/lists/${action.listType}?${query}`;
		next(action);
	});
};

export const listsMiddleWare = store => next => action => {
	switch(action.type) {
		case 'fetchData':
			fetchDataMiddleWare(store, next, action);
			break;
		default:
			next(action);
	}
};

const fetchDataReducer = (state, action) => {
	const schemaName = `${action.listType}Schema`;
	let columnData = state.columnData.length === 0 ? [...allListsSchema[schemaName]] : state.columnData;

	let sortColumn = action.params['$sort'];
	let sortOrder;
	if (sortColumn) {
		sortOrder = sortColumn[0] === '-' ? false : true;
		sortColumn = sortColumn[0] === '-' ? sortColumn.slice(1) : sortColumn;
	}
	columnData = columnData.map(column => ({
			...column,
			searchValue: action.params[column.id] !== undefined ? action.params[column.id]: column.searchValue,
			sortOrder: sortColumn && column.id === sortColumn ? sortOrder : column.sortOrder
	}));
	return {
		...state,
		data: action.data.data,
		columnData
	}
};

export const listsReducer = (state = 0, action) => {
	switch (action.type) {
		case 'fetchData':
			return fetchDataReducer(state, action);
		default:
			return state;
	}
};

const getQuery = () => {
	const hashParts = window.location.hash.split('?');
	return hashParts.length > 0 ? queryObj(hashParts[1]) : {};
}

class ListsView extends React.Component {

	constructor(props) {
		super(props);
		this.dispatch = props.dispatch;
		this.listType = props.params.listType;
		this.fetchData();
	}

	fetchData = (listType) => {
		const params = getQuery();
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
					/>
					{/* <TableFooter/>  */}
				</table>
			</div>
		);
	}
}

const dispatchToProps = (dispatch) => dispatch;

const ConnectedListsView = connect(dispatchToProps)(ListsView);

export default ConnectedListsView;
