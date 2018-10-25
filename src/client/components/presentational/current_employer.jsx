const React = require('react');

export default class CurrentEmployer extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='currentEmployer'>Current Employer</label>
        <input type='text' name='currentEmployer' id='currentEmployer' maxLength='255' value={this.props.savedValue}></input>
      </div>
    );
  }
}
