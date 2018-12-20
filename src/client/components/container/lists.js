import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery, getSortColumns } from '../../utils/helper';
import { Lists } from '../presentational/lists';

export const initState = { columnData: [], data: [] };

class ListsView extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.listType = props.params.listType;
    this.fetchData();
  }

  dispatchFetchData = (params) => {
    this.dispatch({ type: 'fetchData', listType: this.listType, params });
  }

  fetchData = () => {
    const params = getQuery();
    this.dispatchFetchData(params);
  }

  onSearch = ({ col, value }) => {
    let params = getQuery();
    if (value) {
      params = {
        ...params,
        [col]: value
      };
    } else delete params[col];
    this.dispatchFetchData(params);
  }

  onSort = ({ col, asc }) => {
    let params = getQuery();
    let sortColumns = getSortColumns(params)
      .filter(sortcolumn => sortcolumn.col !== col);

    sortColumns.unshift({
      col,
      asc
    });

    const sortStr = (col, asc) => (!asc ? '-' : '') + col;
    const sortParam = sortColumns
      .map((sortColumn) => sortStr(sortColumn.col, sortColumn.asc))
      .join('%20');

    params = {
      ...params,
      $sort: sortParam
    };

    this.dispatchFetchData(params);
  }

  onEdit = (id) => {
    this.dispatch({ type:'fetch_form', url:id, domain:window.location.hash });
  }

  render() {
    return <Lists lists={this.props.lists} onSort={this.onSort} onSearch={this.onSearch} listType={this.listType} onEdit = {this.onEdit}/>;
  }
}

const dispatchToProps = (dispatch) => dispatch;
const ConnectedListsView = connect(dispatchToProps)(ListsView);

export default ConnectedListsView;
