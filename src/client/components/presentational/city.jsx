const React = require('react');

export default class City extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='city'>City</label>
        <input type='text' name='city' id='city' maxLength='100' value={this.props.savedValue}></input>
      </div>
    );
  }
}
