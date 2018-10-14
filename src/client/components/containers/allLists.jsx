import React from 'react';
import { Link } from 'react-router-dom';

const baseSchema = {
    searchable: true,
    sortable: true
};

export const interviewersSchema = [{
    ...baseSchema,
    label: 'ID',
    id: 'id'
}, {
    ...baseSchema,
    label: 'Name',
    id: 'name',
}, {
    ...baseSchema,
    label: 'Email',
    id: 'email',
}, {
    ...baseSchema,
    label: 'Mobile',
    id: 'mobile',
}, {
    ...baseSchema,
    label: 'Date of Birth',
    id: 'date_of_birth',
}, {
    ...baseSchema,
    label: 'Level',
    id: 'level',
}, {
    ...baseSchema,
    label: 'Department',
    id: 'department',
}, {
    ...baseSchema,
    label: 'Business Unit',
    id: 'business_unit',
}];

export const candidatesSchema = [{
    ...baseSchema,
    id: 'name',
    label: 'Name',
}, {
    ...baseSchema,
    id: 'email',
    label: 'Email',
}, {
    ...baseSchema,
    id: 'mobile',
    label: 'Mobile',
}, {
    ...baseSchema,
    id: 'qualification',
    label: 'Qualification',
    sortable: false
}, {
    ...baseSchema,
    id: 'current_employer',
    label: 'Current Employer',
}, {
    ...baseSchema,
    id: 'current_role',
    label: 'Current Role',
}, {
    ...baseSchema,    
    id: 'skills',
    label: 'Skills',
    sortable: false
}];

const listsType = [
    'candidates',
    'interviewers'
];

const allListsStyle = {
    textAlign: 'left',
    margin: '25px'
}

export const AllLists = (props) => {
    return(
        <ul style={allListsStyle}>
            {listsType.map(list => (
                <li key={list}>
                    <Link to={`/lists/${list}`}>{list}</Link>
                </li>
            ))}
        </ul>
    );
}