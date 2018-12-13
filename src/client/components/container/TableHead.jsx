import React, { Component } from 'react';
import { isDefined } from '../../utils/helper';

class TableHeader extends Component {
    state = { showSearch: true }

    toggleSearch = () => {
        this.setState((prevState) => ({ showSearch: !prevState.showSearch }));
    }

    render() {
        const { columnData, onSort, onSearch } = this.props;
        return (
            <thead>
                <tr>
                    { columnData.map((col, i) => <HeaderLabel col={col} onSort={onSort} key={i}/>) }
                    <td>
                        <button type="button" className="btn btn-default" aria-label="Right Align" onClick={this.toggleSearch}>
                            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                    </td>
                </tr>
                <tr style={{display: this.state.showSearch ? 'table-row' : 'none'}}>
                    { columnData.map((col, i) => <HeaderSearch col={col} onSearch={onSearch} key={i}/>) }
                </tr>
            </thead>
        );
    }
}

class HeaderSearch extends Component {
    onInputChange = (e) => {
        const { onSearch, col: { id } } = this.props;
        onSearch({
            col: id, value: e.target.value
        });
    }
    render() {
        const { col: { label, id, sortable, searchValue }, onSearch } = this.props;
        return (
            <td className="table-header-cell">
                {<input type="text" value={searchValue || ''} style={{ width: '100%' }} placeholder="Search" onChange={this.onInputChange} />}
            </td>
        );
    }
}

class HeaderLabel extends Component {
    onLabelClick = () => {
        const { onSort, col: { id, sortOrder } } = this.props;
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

export default TableHeader;