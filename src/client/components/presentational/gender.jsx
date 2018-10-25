const React = require('react');

export default class Gender extends React.Component{
  render() {
    let selectGender = this.props.savedValue === 'F'? 'F' : 'M';

    return (
      <div className='form-group'>
        <label htmlFor='gender'>Gender</label>
        <select name='gender' defaultValue={selectGender}>
          <option value='F'>Female</option>
          <option value='M'>Male</option>
        </select>
      </div>
    );
  }
}
