import React from 'react';
import TableHeader from '../container/TableHead';
import { TableBody } from './TableBody';
import TableFooter from '../container/TableFooter';

export const Lists = ({ lists, listType, onSearch, onSort, onEdit, onDelete, onDetail, showActions=true }) => {
    let tableClass = "table table-striped";
    if(showActions)
      tableClass += " table-action";
    return (
        <div>
            <table className={tableClass}>
                <TableHeader
                    columnData={lists.columnData}
                    onSearch={onSearch}
                    onSort={onSort}
                />
                <TableBody
                    data={lists.data}
                    columnData={lists.columnData}
                    onEdit = {onEdit}
                    onDelete = {onDelete}
                    onDetail = {onDetail}
                    showActions = {showActions}
                />
                <TableFooter 
                    colCount={lists.columnData.length+showActions}
                    currentFrom={lists.skip ? lists.skip + 1 : '1'}  
                    currentTo={lists.limit ? lists.skip + lists.limit : '20'}  
                    skip={lists.skip ? lists.skip : '0'}
                    limit={lists.limit ? lists.limit : '20'}
                    totalRecords={lists.total ? lists.total : '100'}
                    listType={listType}
                />
            </table>
        </div>
    );
};
