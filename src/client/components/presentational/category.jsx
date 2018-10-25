const React = require('react');

export default class Category extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <input type='text' name='category' id='category' maxLength='50' value={this.props.savedValue}></input>
      </div>
    );
  }
}
