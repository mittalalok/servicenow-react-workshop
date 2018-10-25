const React = require('react');

export default class State extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='state'>State</label>
        <input type='text' name='state' id='state' maxLength='100' value={this.props.savedValue}></input>
      </div>
    );
  }
}
