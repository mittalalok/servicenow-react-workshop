import { listSchema } from '../utils/listSchema';
import { getSortColumns } from '../utils/helper';

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
    let columnData = state.columnData.length === 0 ? [...listSchema[action.listType]] : state.columnData;
    let sortColumns = getSortColumns(action.params);

    columnData = columnData.map(column => {
        let sortColumn = sortColumns.find((sortColumn) => sortColumn.col === column.id);
        return {
            ...column,
            searchValue: action.params[column.id] !== undefined ? action.params[column.id]: '',
            sortOrder: sortColumn ? sortColumn.asc : column.sortOrder
        }
    });
    return {
        ...state,
        data: action.data.data,
        limit: action.data.limit,
        skip: action.data.skip,
        total: action.data.total,
        columnData
    };
};

