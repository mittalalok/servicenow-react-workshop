const React = require('react');

export default class Button extends React.Component{
  render() {
    return (
      <button type="button" className="form-control">{this.props.text}</button>
    );
  }
}
