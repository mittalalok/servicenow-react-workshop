import React from 'react';
import ReactTable from 'react-table';
import data from './MOCK_DATA.js';
import 'react-table/react-table.css';

const labels = {
  'first_name': 'First Name',
  'last_name': 'Last Name',
  'gender': 'Gender',
  'email': 'Email',
  'street_address': 'Street Address',
  'city': 'City',
  'state': 'State',
  'country': 'Country',
  'pin': 'Pin Code',
  'mobile': 'Phone#',
  'dob': 'Date of Birth'
};

const getColumns = () => Object.keys(labels).map((k) => ({ Header: labels[k], accessor: k }));

class ListsView extends React.Component {
  render() {
    return (
      <div>
        <h1>Lists</h1>
        <ReactTable data={data}
          columns={getColumns()}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable />
      </div>
    );
  }
}

export default ListsView;
