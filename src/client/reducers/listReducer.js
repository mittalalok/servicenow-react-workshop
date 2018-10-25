import * as allListsSchema from '../components/containers/allLists';

export const listReducer = (state = 0, action) => {
	switch (action.type) {
		case 'fetchData':
			return fetchDataReducer(state, action);
		case 'RELOAD_LIST':
			return fetchDataReducer(state, action);
		default:
			return state;
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
		limit: action.data.limit,
		skip: action.data.skip,
		total: action.data.total,
		columnData
	}
};

