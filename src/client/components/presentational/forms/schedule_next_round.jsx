import React from 'react';
import SearchBox from '../searchDropDown/index.jsx';
import Label from '../../forms/label';
import Input from '../../forms/input';
import PropTypes from 'prop-types';

const INTERVIEWER = 'Interviewer', DATE = 'Date', RECOMMENDED = 'Recommended', DURATION='Duration (in minutes)', INTERVIEW_MODE='Interview Mode', LOCATION='Location';

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
    console.log('handleChange:', key, value);
    this.props.setNextRoundDate(value);
  }

  onUserChange(val){
    let role = { name:'Interviewer', id:'Interviewer' };
    val = { role: role, search: val };
    this.props.searchInterviewer(val);
  }

  render(){
    if(!this.props)
      return null;
    const { users, showDropdown, requestingData, onUserSelect,
      handleDropDownHover, currentHoveredUserIndex } = this.props;
    const selectedValue = this.props.selectedUser ? this.props.selectedUser.name : '';
    return <div className='component-login'>
      <form>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={INTERVIEWER}/>
          <SearchBox onSearch={this.onUserChange.bind(this)} data={users} isSearching={requestingData} showDropdown={showDropdown} onSelect={onUserSelect} currentHoveredUserIndex={currentHoveredUserIndex} handleDropDownHover={handleDropDownHover} selectedValue={selectedValue} />
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={DATE}/>
          <Input type='date' required={true} handleChange={this.handleChange} value={this.props.next_round_date}/>
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={DURATION} />
          <Input type='number' required={true} handleChange={this.handleChange} />
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={RECOMMENDED} />
          <Input type='select' required={true} handleChange={this.handleChange} options={[{ displayValue: 'Yes', value: true }, { displayValue: 'No', value: false }]} value={false} />
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={INTERVIEW_MODE} />
          <Input type='select' required={true} handleChange={this.handleChange} options={[{ displayValue: 'Office', value: 'office' }, { displayValue: 'Call', value: 'call' }]} value='office' />
        </div>
        <div className='col-sm-6 form-group'>
          <Label class='col-sm-12 col-form-label' required={true} value={LOCATION} />
          <Input type='string' required={true} handleChange={this.handleChange} />
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
  setNextRoundDate: PropTypes.func
};
