const React = require('react');

export default class AlternatePhone extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='alternatePhone'>Alternate Phone</label>
        <input type='tel' name='alternatePhone' id='alternatePhone' maxLength='20' value={this.props.savedValue}></input>
      </div>
    );
  }
}
