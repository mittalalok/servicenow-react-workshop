import React from 'react';
import { connect } from 'react-redux';
import CandidateSummary from '../../container/candidateSummary.js';
import HorizontalRule from '../forms/horizontalRule';
import SelectionDetails from '../selection/selectionDetails';
import RoundDetails from '../../container/roundDetails.js';

class SelectionView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    if(!this.props.mapper)
      return null;
    return <div>
      <div>
        <h3>Candidate Summary</h3>
        <HorizontalRule />
        <CandidateSummary />
      </div>
      <div>
        <h3>Selection Details</h3>
        <HorizontalRule />
        <SelectionDetails />
      </div>
      <div>
        <h3>Round Details</h3>
        <HorizontalRule />
        <RoundDetails />
      </div>
    </div>;
  }
}

const stateToProps = (state) => {
  return {
    state: state, mapper: state.lists.mapper
  };
};

const dispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(stateToProps, dispatchToProps)(SelectionView);
