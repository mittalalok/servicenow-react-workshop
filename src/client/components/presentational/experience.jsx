const React = require('react');

export default class Experience extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='experience'>Experience</label>
        <input type='number' name='experience' id='experience' value={this.props.savedValue}></input>
      </div>
    );
  }
}
