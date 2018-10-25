const React = require('react');

export default class StreetAddress extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='streetAddress'>Street Address</label>
        <input type='text' name='streetAddress' id='streetAddress' maxLength='255' value={this.props.savedValue}></input>
      </div>
    );
  }
}
