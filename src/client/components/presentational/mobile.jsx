const React = require('react');

export default class Mobile extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='mobile'>Mobile Number</label>
        <input type='tel' name='mobile' id='mobile' maxLength='20' value={this.props.savedValue}></input>
      </div>
    );
  }
}
