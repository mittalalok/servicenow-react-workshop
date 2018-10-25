const React = require('react');

export default class DOB extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='dob'>Date of Birth: </label>
        <input type='date' name='dob' id='dob' value={this.props.savedValue}></input>
      </div>
    );
  }
}
