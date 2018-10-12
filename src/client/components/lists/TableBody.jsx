import React from 'react';

const Fragment = ({ children }) => children;

export const TableBody = (props) => {
    const { data, columnData } = props;
    if (!data) return null;
        
    return (
        <tbody>
            {
                data.map((row, i) => (
                    <tr key={i}>
                        {
                            columnData.map((column, j) => (
                                <td className="table-body-column">
                                    {
                                        row[column.id]
                                    }
                                </td>
                            ))
                        }
                    </tr> 
                ))
            }
        </tbody>
    ); 
};