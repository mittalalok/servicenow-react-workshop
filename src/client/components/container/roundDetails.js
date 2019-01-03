import { connect } from 'react-redux';
import RoundDetails from '../presentational/forms/roundDetails.jsx';

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => {
  return { state:state };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundDetails);
