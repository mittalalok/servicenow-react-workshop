const React = require('react');

export default class CurrentRole extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='currentRole'>Current Role</label>
        <input type='text' name='currentRole' id='currentRole' maxLength='50' value={this.props.savedValue}></input>
      </div>
    );
  }
}
