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
	render() {
		const { col: { label, id, sortable }, onSearch } = this.props;
		// TODO: Move onInputChange out of render
		const onInputChange = (e) => {
			debugger
			onSearch({
				col: id, value: e.target.value
			});
		}
		return (
			<td className="table-header-cell">
				{<input type="text" style={{ width: '100%' }} placeholder="Search" onChange={onInputChange} />}
			</td>
		);
	}
}

class HeaderLabel extends React.Component {
	render() {
		const { col: { label, id, sortable, sortOrder }, onSort } = this.props;
		// TODO: Move onInputChange out of render
		const onLabelClick = (e) => {
			debugger
			onSort({
				col: id, asc: !sortOrder
			});
		}
		return (
			<td className="table-header-cell">
				<div className="label-wrap">
					<a className={sortable ? 'sortable-label' : ''} onClick={onLabelClick}>{ label }</a>
					{sortable && sortedAsc ? <i className="glyphicon glyphicon-chevron-up"></i> : null}
					{sortable && sortedDesc ? <i className="glyphicon glyphicon-chevron-down"></i> : null}
				</div>
			</td>
		);
	}
}

export default TableHeader;