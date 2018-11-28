import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateList } from '../../actions/listNavigation';
import { TableFooter } from '../presentational/TableFooter';

class TableFooterComponent extends Component {

    goToFirst = () => {
        if (this.props.currentFrom === '1')
            return;
        let params = { $limit: this.props.limit, $skip: 0 };
        this.navigate(params);
    }

    goToLast = () => {
        if (this.props.currentTo === this.props.totalRecords)
            return;
        let params = { $limit: this.props.limit, $skip: this.props.totalRecords - this.props.limit };
        this.navigate(params);
    }

    goPrevious = () => {
        if (this.props.currentFrom === '1')
            return;
        let params = { $limit: this.props.limit };
        if (this.props.currentFrom < this.props.limit)
            params.$skip = 0;
        else
            params.$skip = this.props.skip - this.props.limit;
        this.navigate(params);
    }

    goNext = () => {
        if (this.props.currentTo === this.props.totalRecords)
            return;
        let params = { $limit: this.props.limit };
        if ((this.props.currentTo + this.props.limit) > this.props.totalRecords)
            params.$skip = this.props.totalRecords - this.props.limit;
        else
            params.$skip = this.props.skip + this.props.limit;
        this.navigate(params);
    }

    onChangeNumber = () => {
        alert('Feature Coming Soon');
    }

    navigate = (params) => {
        let listData = {};
        listData.listType = this.props.listType;
        listData.params = params;
        this.props.dispatch(navigateList(listData));
    }

    render() {
        return <TableFooter
            goToFirst={this.goToFirst}
            goPrevious={this.goPrevious}
            onChangeNumber={this.onChangeNumber}
            goNext={this.goNext}
            goToLast={this.goToLast}
            currentFrom={this.props.currentFrom}
            totalRecords={this.props.totalRecords}
            currentTo={this.props.currentTo}
        />;
    }       
}

const dispatchToProps = (dispatch) => dispatch;

export default connect(dispatchToProps)(TableFooterComponent);