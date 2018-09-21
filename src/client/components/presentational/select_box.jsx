const React = require("react");

export default class SelectBox extends React.Component{
  render() {
    return (
      <input type="checkbox" value={this.props.value} className="form-control"/>
    );
  }
}
