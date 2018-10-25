const React = require('react');

export default class Name extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' maxLength='255' minLength='5' value={this.props.savedValue}></input>
      </div>
    );
  }
}
