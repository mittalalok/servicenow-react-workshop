import React from 'react';
import SearchBox from '../searchBox.jsx';
import Label from '../forms/label';
import Input from '../forms/input';
import PropTypes from 'prop-types';

const INTERVIEWER = 'Interviewer', DATE = 'Date';

const NamedObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

export default class ScheduleNextRound extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value){
    this.props.setNextRoundDate(value);
  }

  // scheduleRound(){
  //   let round = { interviewer: this.props.selectedUser, date: this.props.next_round_date };
  //   console.log('next round details:', this.props);
  // }

  onUserChange(val){
    let role = { name:'Interviewer', id:'Interviewer' };
    val = { role: role, search: val };
    this.props.searchInterviewer(val);
  }

  render(){
    const { users, showDropdown, requestingData, onUserSelect,
      handleDropDownHover, currentHoveredUserIndex } = this.props;
    const selectedValue = this.props.selectedUser ? this.props.selectedUser.name : '';
    return <div className='component-login'>
      <form>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={INTERVIEWER}/>
          <SearchBox onKeyDown={this.onUserChange.bind(this)} data={users} isLoading={requestingData} showDropdown={showDropdown} onUserSelect={onUserSelect} currentHoveredUserIndex={currentHoveredUserIndex} handleDropDownHover={handleDropDownHover} selectedValue={selectedValue} />
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={DATE}/>
          <Input type='date' required={true} handleChange={this.handleChange} value={this.props.next_round_date}/>
        </div>
      </form>
    </div>;
  }
}

ScheduleNextRound.propTypes = {
  searchInterviewer: PropTypes.func,
  selectedUser: NamedObjectType,
  users: PropTypes.arrayOf(NamedObjectType),
  changeRole: PropTypes.func,
  searchUser: PropTypes.func,
  onUserSelect: PropTypes.func,
  showDropdown: PropTypes.bool.isRequired,
  requestingData: PropTypes.bool.isRequired,
  currentHoveredUserIndex: PropTypes.number.isRequired,
  handleDropDownHover: PropTypes.func.isRequired,
  next_round_date: PropTypes.string,
  setNextRoundDate: PropTypes.func,
  scheduleNextRound: PropTypes.func
};
