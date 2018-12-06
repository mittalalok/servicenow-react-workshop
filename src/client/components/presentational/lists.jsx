import React from 'react';
import TableHeader from './TableHead';
import { TableBody } from './TableBody';
import TableFooter from '../container/TableFooter';

export const Lists = ({ lists, listType, onSearch, onSort, onEdit }) => {
    
    return (
        <div>
            <table className="list-table">
                <TableHeader
                    columnData={lists.columnData}
                    onSearch={onSearch}
                    onSort={onSort}
                />
                <TableBody
                    data={lists.data}
                    columnData={lists.columnData}
                    onEdit = {onEdit}
                />
            </table>
            <table className="list-table">
                <TableFooter 
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