import React from 'react';

export const TableBody = (props) => {
    const { data, columnData } = props;
    if (!data) return null;

    let onEdit =  (id) => {
        props.onEdit(id);
    }; 

    return (
        <tbody>
            {
                data.map((row, i) => (
                    <tr key={i}>
                        {
                            columnData.map((column, j) => (
                                <td className="table-body-column" key={j}>
                                    {
                                        row[column.id]
                                    }
                                </td>
                            ))
                        }
                        <td>
                            <button type="button" className="btn btn-default" aria-label="Right Align" onClick={onEdit.bind(this, row['_id'])}>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr> 
                ))
            }
        </tbody>
    ); 
};