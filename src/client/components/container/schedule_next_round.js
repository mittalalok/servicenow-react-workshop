import { connect } from 'react-redux';
import { requestingData, requestData, updateUserList, hoveredUser, selectedUser, nextRoundDate } from '../../actions/form';
import ScheduleNextRound from '../presentational/forms/schedule_next_round.jsx';


function  getTodayDate(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

const mapDispatchToProps = dispatch => ({
  searchInterviewer: (params) => {
    dispatch(requestingData());
    dispatch(requestData(params, (data) => {
      dispatch(updateUserList(data));
    }));
  },
  handleDropDownHover: (ind) => {
    if (typeof(ind) !== 'undefined') {
      dispatch(hoveredUser(ind));
    }
  },
  onUserSelect: (entity) => {
    dispatch(selectedUser(entity));
  },
  setNextRoundDate: (date) => {
    dispatch(nextRoundDate(date));
  }
});

function mapStateToProps(state){
  let requestingData = state.form.requestingData == undefined ? false : state.form.requestingData;
  let showDropdown = state.form.showDropdown == undefined ? false : state.form.showDropdown;
  let next_round_date =  state.form.next_round_date == undefined ? getTodayDate() : state.form.next_round_date;

  return { currentHoveredUserIndex: 0, requestingData: requestingData, showDropdown: showDropdown, users: state.form.users, next_round_date: next_round_date, selectedUser: state.form.selectedUser, state: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleNextRound);
