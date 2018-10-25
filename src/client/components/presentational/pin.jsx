const React = require('react');

export default class Pin extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='pin'>Pin</label>
        <input type='text' name='pin' id='pin' maxLength='20' value={this.props.savedValue}></input>
      </div>
    );
  }
}
