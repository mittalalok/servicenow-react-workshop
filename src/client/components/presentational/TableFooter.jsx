import React from 'react';

export const TableFooter = ({ goToFirst, goPrevious, onChangeNumber, goNext, goToLast, currentFrom, totalRecords, currentTo, colCount }) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={colCount}>
          <form className="form-inline">
            <div className="form-group">
              <button className="btn btn-primary" onClick={goToFirst}>First</button>
              <button className="btn btn-primary" onClick={goPrevious}>Previous</button>
            </div>
            <div className="input-group">
              <div className="input-group-addon">Showing records</div>
              <input type="text" className="form-control" placeholder="Page number" onChange={onChangeNumber} value={currentFrom} />
              <div className="input-group-addon">to {(totalRecords < currentTo) ? totalRecords : currentTo} of {totalRecords}</div>
            </div>
            <button className="btn btn-primary" onClick={goNext}>Next</button>
            <button className="btn btn-primary" onClick={goToLast}>Last</button>
          </form>
        </td>
      </tr>
    </tfoot>
  );
};
