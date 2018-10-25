const React = require('react');

export default class AdditionalDetails extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='additionalDetails'>Additional Details</label>
        <input type='text' name='additionalDetails' id='additionalDetails' maxLength='255' value={this.props.savedValue}></input>
      </div>
    );
  }
}
