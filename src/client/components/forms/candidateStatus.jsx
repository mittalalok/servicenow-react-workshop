import React, { Component } from 'react';
import { setCandidateStatus } from '../../actions/form.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CandidateStatus extends Component{

  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.setCandidateStatus(e.target.value);
  }

  render() {
    return <form>
      <select name='status' onChange={this.handleChange} defaultValue='select_status'>
        <option hidden value='select_status'>Select Status</option>
        <option value='accept'>Accept</option>
        <option value='reject'>Reject</option>
      </select>
    </form>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCandidateStatus: status => dispatch(setCandidateStatus(status))
});

function mapStateToProps(){
  return { };
}

CandidateStatus.propTypes = {
  setCandidateStatus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateStatus);
