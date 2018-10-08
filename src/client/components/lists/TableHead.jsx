import React from 'react';

const Wrapper = ({ children }) => children;

const sortedAsc = false; // TODO
const sortedDesc = false; // TODO

class TableHeader extends React.Component {
	render() {
		const { columnData, onSort, onSearch } = this.props;
		return (
			<Wrapper>
				<th>
					{ columnData.map(col => <HeaderLabel col={col} onSort={onSort}/>) }
				</th>
				<th>
					{ columnData.map(col => <HeaderSearch col={col} onSearch={onSearch}/>) }
				</th>
			</Wrapper>
		);
	}
};

class HeaderSearch extends React.Component {
	render() {
		const { col: { label, type, sortable }, onSort } = this.props;
		return (
			<td className="table-header-cell">
				{<input type="text" style={{ width: '100%' }} placeholder="Search" />}
			</td>
		);
	}
}

class HeaderLabel extends React.Component {
	render() {
		const { col: { label, type, sortable }, onSort } = this.props;
		return (
			<td className="table-header-cell">
				<div class="label-wrap">
					<a className={sortable ? 'sortable-label' : ''}>{label}</a>
					{sortable && sortedAsc ? <i className="glyphicon glyphicon-chevron-up"></i> : null}
					{sortable && sortedDesc ? <i className="glyphicon glyphicon-chevron-down"></i> : null}
				</div>
			</td>
		);
	}
}

export default TableHeader;