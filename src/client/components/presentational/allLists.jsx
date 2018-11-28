import React from 'react';
import { Link } from 'react-router-dom';
import { listType } from '../../utils/listSchema';

const allListsStyle = {
    textAlign: 'left',
    margin: '25px'
};

export const AllLists = () => {
    return(
        <ul style={allListsStyle}>
            {listType.map(list => (
                <li key={list}>
                    <Link to={`/lists/${list}`}>{list}</Link>
                </li>
            ))}
        </ul>
    );
};