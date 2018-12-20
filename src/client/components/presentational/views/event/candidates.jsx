import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Selection from '../../../../services/models/selections';
import logger from '../../../../services/logger';
import { Lists } from '../../../../components/presentational/lists';


let columns = [
  { label: 'Name', id: 'name' },
  { label: 'DOB', id: 'dob' },
  { label: 'Email', id: 'email' },
  { label: 'Qualification', id: 'qualification' },
  { label: 'Experience', id: 'experience' }
];

const mapFunc = (p) => {
  return {
    name: p.candidate.name,
    dob: p.candidate.dob,
    email: p.candidate.email,
    qualification: p.candidate.qualification,
    experience: p.candidate.experience,
  };
};


class CandidatesOfEvent extends React.Component {

  constructor(props) {
    super(props);
    this.dataService = new Selection();
    this.state = {
      lists: null
    };
  }

  componentDidMount() {
    this.dataService.getAllForEvent(this.props.eventId)
      .then((d) => {
        logger.info(d);
        let data = d.data.data.map(mapFunc);

        this.setState({
          lists: {
            columnData: columns,
            data: data,
            skip: d.data.skip,
            limit: d.data.limit,
            total: d.data.total,
          }
        });
      }, logger.error);

  }

  render() {
    if (this.state.lists) {
      return <Lists
        listType="candidates"
        lists={this.state.lists}
        onSearch = {()=>{}}
        onSort = {()=>{}}
        onEdit = {()=>{}}
        onDelete = {()=>{}}
      />;
    }
    return <div> Candidate Manager </div>;
  }
}


const stateToProps = (state) => {
  let path = state.router.location.pathname;
  return {
    eventId: path.substring(8, path.indexOf('/candidates'))
  };
};
const dispatchToProps = () => {
  return {};
};

const ConnectedView = connect(
  stateToProps,
  dispatchToProps)(CandidatesOfEvent);

export default ConnectedView;
