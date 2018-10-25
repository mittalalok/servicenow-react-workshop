const React = require('react');

export default class Email extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' maxLength='255' value={this.props.savedValue}></input>
      </div>
    );
  }
}
