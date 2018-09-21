const React = require('react');

export default class Textarea extends React.Component{
  render() {
    return (
      <textarea row={this.props.row} col={this.props.col} className="form-control"></textarea>
    );
  }
}
