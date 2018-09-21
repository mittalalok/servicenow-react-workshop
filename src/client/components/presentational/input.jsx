const React = require("react");

export default class Input extends React.Component {
  render() {
    return (
      <input type={this.props.type} name={this.props.name} className="form-control" />
    );
  }
}
