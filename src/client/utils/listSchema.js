const CANDIDATES = 'candidates';
const INTERVIEWERS = 'interviewers';

export const listType = [
    CANDIDATES,
    INTERVIEWERS
];

const baseSchema = {
    searchable: true,
    sortable: true
};

export const listSchema = {
    [CANDIDATES]: [{
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
    }],

    [INTERVIEWERS]: [{
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
    }]
};
