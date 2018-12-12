import React, { Component } from 'react';
import { setCandidateStatus } from '../../actions/form.js';
import { connect } from 'react-redux';

class CandidateStatus extends Component{

  constructor(props){
    super(props);
    this.state = { ...this.props.state };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ candidateStatus: e.target.value });
    console.log(this.state);
  }

  render() {
    return <form>
      <select name='status' onChange={this.handleChange} required defaultValue='select_status'>
        <option hidden value='select_status'>Select Status</option>
        <option value='accept'>Accept</option>
        <option value='reject'>Reject</option>
      </select>
    </form>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    candidateStatus: () => dispatch({
      type: 'set_candidate_status'
    })
  };
};

function mapStateToProps(state){
  return { candidateStatus: state.candidateStatus };
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateStatus);
