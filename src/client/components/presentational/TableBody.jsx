import React from 'react';
import PropTypes from 'prop-types';

export const TableBody = (props) => {
  const { data, columnData } = props;
  if (!data) return null;

  let onEdit = (id) => {
    props.onEdit(id);
  };

  let onDelete = (id) => {
    props.onDelete(id);
  };

  let onDetail = (id) => {
    props.onDetail(id);
  };

  return (
    <tbody>
      {
        data.map((row, i) => (
          <tr key={i}>
            {
              columnData.map((column, j) => (
                <td key={j}>
                  {
                    row[column.id]
                  }
                </td>
              ))
            }{
              (props.showActions) ?
                (
                  <td className="btn-group">
                    <button type="button" className="btn btn-default" onClick={onDetail.bind(this, row['_id'])}>
                      <span className="glyphicon glyphicon-eye-open"></span>
                    </button>
                    <button type="button" className="btn btn-default" onClick={onEdit.bind(this, row['_id'])}>
                      <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-default" onClick={onDelete.bind(this, row['_id'])}>
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                  </td>
                ) : (null)
            }
          </tr>
        ))
      }
    </tbody>
  );
};
