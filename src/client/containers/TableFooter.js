import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ListsAPI } from '../services/ListServices';
import { navigateList } from '../actions/listNavigation';
import { queryString } from '../utils/helper';

class TableFooter extends Component{
	constructor(props){
		super(props);

		this.goToFirst = this.goToFirst.bind(this);
		this.goToLast = this.goToLast.bind(this);
		this.goPrevious = this.goPrevious.bind(this);
		this.goNext = this.goNext.bind(this);
	}

	goToFirst(){
		if(this.props.currentFrom === "1")
			return;
		let params = {$limit: this.props.limit, $skip: 0};
		this.navigate(params);
	}

	goToLast(){
		if(this.props.currentTo === this.props.totalRecords)
			return;
		let params = {$limit: this.props.limit, $skip: this.props.totalRecords - this.props.limit};
		this.navigate(params);
	}

	goPrevious(){
		if(this.props.currentFrom === "1")
			return;
		let params = {$limit: this.props.limit};
		if(this.props.currentFrom < this.props.limit)
			params.$skip = 0;
		else
			params.$skip = this.props.skip - this.props.limit;
		this.navigate(params);
	}

	goNext(){
		if(this.props.currentTo === this.props.totalRecords)
			return;
		let params = {$limit: this.props.limit};
		if((this.props.currentTo + this.props.limit) > this.props.totalRecords)
			params.$skip = this.props.totalRecords - this.props.limit;
		else
			params.$skip = this.props.skip + this.props.limit;
		this.navigate(params);
	}

	onChangeNumber(){
		alert("Feature Coming Soon");
	}

	navigate(params){
		let listData = {};
		listData.listType = this.props.listType;
		listData.params = params;
		this.props.navigateList(listData);
	}

	render(){
		return (
			<tfoot>
				<tr>
					<td></td>
					<td><button onClick={this.goToFirst}>First</button></td>
					<td><button onClick={this.goPrevious}>Previous</button></td>
					<td>
						<input readOnly={false} onChange={this.onChangeNumber} value={this.props.currentFrom}/> to {(this.props.totalRecords<this.props.currentTo) ? this.props.totalRecords : this.props.currentTo} of {this.props.totalRecords}
					</td>
					<td><button onClick={this.goNext}>Next</button></td>
					<td><button onClick={this.goToLast}>Last</button></td>
					<td></td>
				</tr>
			</tfoot>
		);
	}
		
};

function mapDispatchToProps(dispatch){
	return bindActionCreators({navigateList}, dispatch);
};

export default connect(null, mapDispatchToProps)(TableFooter);