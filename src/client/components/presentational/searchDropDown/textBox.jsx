import React from 'react';
import PropTypes from 'prop-types';

export default class TextBox extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    placeholderText: PropTypes.string,
    isDisabled: PropTypes.bool.isRequired
  };
  render() {
    return <input type="text"
      disabled={this.props.isDisabled ? 'disabled' : ''}
      autoComplete="off"
      className="form-control"
      id={`search-drop-down-${this.props.prefix}`}
      placeholder={this.props.placeholderText}
      onKeyDown={this.props.onKeyDown}
      onChange={this.props.onChange}
      value={this.props.textValue}/>;
  }
}
