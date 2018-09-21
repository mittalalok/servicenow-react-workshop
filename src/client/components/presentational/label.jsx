const React = require('react');

export default class Label extends React.Component{
  render(){
    return (
      <label htmlFor={this.props.for} className="form-control">{this.props.for}</label>
    );
  }
}
