import React from 'react';

export const TableFooter = ({ goToFirst, goPrevious, onChangeNumber, goNext, goToLast, currentFrom, totalRecords, currentTo }) => {
    return (
        <tfoot>
            <tr>
                <td></td>
                <td><button onClick={goToFirst}>First</button></td>
                <td><button onClick={goPrevious}>Previous</button></td>
                <td>
                    <input readOnly={false} onChange={onChangeNumber} value={currentFrom}/> to {(totalRecords < currentTo) ? totalRecords : currentTo} of {totalRecords}
                </td>
                <td><button onClick={goNext}>Next</button></td>
                <td><button onClick={goToLast}>Last</button></td>
                <td></td>
            </tr>
        </tfoot>
    );
};