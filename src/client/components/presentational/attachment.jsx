const React = require('react');

export default class Attachment extends React.Component{
  render() {
    return (
      <div className='form-group'>
        <label htmlFor='attachment'>Attachment</label>
        <input type='file' name='attachment' id='attachment' accept='.pdf'></input>
      </div>
    );
  }
}
