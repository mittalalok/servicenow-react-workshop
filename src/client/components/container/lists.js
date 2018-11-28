import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuery } from '../../utils/helper';
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
        params = {
            ...params,
            [col]: value
        };
        this.dispatchFetchData(params);        
    }

    onSort = ({ col, asc }) => {
        let params = getQuery();
        params = {
            ...params,
            $sort: (!asc ? '-' : '') + col
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
