import React from 'react';

const Wrapper = ({ children }) => children;

const sortedAsc = false; // TODO
const sortedDesc = false; // TODO

class TableHeader extends React.Component {
	render() {
		const { columnData, data, onSort, onSearch } = this.props;
		return (
			<thead>
				<th>
					{ columnData.map((col, i) => <HeaderLabel col={col} onSort={onSort} key={i}/>) }
				</th>
				<th>
					{ columnData.map((col, i) => <HeaderSearch col={col} onSearch={onSearch} key={i}/>) }
				</th>
			</thead>
		);
	}
};

class HeaderSearch extends React.Component {
	onInputChange = (e) => {
		const { onSearch, col: { id } } = this.props;
		onSearch({
			col: id, value: e.target.value
		})
	}
	render() {
		const { col: { label, id, sortable }, onSearch } = this.props;
		return (
			<td className="table-header-cell">
				{<input type="text" style={{ width: '100%' }} placeholder="Search" onChange={this.onInputChange} />}
			</td>
		);
	}
}

class HeaderLabel extends React.Component {
	onLabelClick = (e) => {
		const { onSort, col: { id } } = this.props;
		onSort({
			col: id, asc: !sortOrder
		});
	}
	render() {
		const { col: { label, id, sortable, sortOrder }, onSort } = this.props;
		return (
			<td className="table-header-cell">
				<div className="label-wrap">
					<a className={sortable ? 'sortable-label' : ''} onClick={this.onLabelClick}>{ label }</a>
					{ isDefined(sortOrder) && sortOrder ? <i className="glyphicon glyphicon-chevron-up"></i> : null}
					{ isDefined(sortOrder) && !sortOrder ? <i className="glyphicon glyphicon-chevron-down"></i> : null}
				</div>
			</td>
		);
	}
}

const isDefined = (a) => typeof a !== 'undefined' && a !== null;

export default TableHeader;