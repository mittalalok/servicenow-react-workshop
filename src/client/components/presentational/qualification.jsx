const React = require('react');

export default class Qualification extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='qualification'>Qualification</label>
        <input type='text' name='qualification' id='qualification' maxLength='50' value={this.props.savedValue}></input>
      </div>
    );
  }
}
