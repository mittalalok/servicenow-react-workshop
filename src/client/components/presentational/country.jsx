const React = require('react');

export default class Country extends React.Component{
  render() {
    return (
      <div className='form-contrl'>
        <label htmlFor='country'>Country</label>
        <input type='text' name='country' id='country' maxLength='100' value={this.props.savedValue}></input>
      </div>
    );
  }
}
