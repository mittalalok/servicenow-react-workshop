const React = require('react');

export default class Skills extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='skills'>Skills</label>
        <input type='text' name='skills' id='skills' maxLength='255' value={this.props.savedValue}></input>
      </div>
    );
  }
}
