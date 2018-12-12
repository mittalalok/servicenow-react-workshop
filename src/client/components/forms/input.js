import React, { Component } from 'react';
import PropTypes from 'prop-types';

const readOnlyText = {
  backgroundColor: 'transparent',
  border: 0,
};

class Input extends Component {
  constructor(props){
    super(props);
    this.state = { value : this.props.value };
    this.handleChange = this.handleChange.bind(this);
    this.type = this.props.type;
  }
  handleChange(event){
    this.setState({ value: event.target.value });
    this.props.handleChange(this.props.mapKey, event.target.value);
  }
  render(){
    return <input className = {this.props.class}  type = {this.props.type} id = {this.props.mapKey} placeholder = {this.props.placeHolder} onChange = {this.handleChange} value = {this.state.value || ''} required={this.props.required} minLength={this.props.min} maxLength={this.props.max} accept={this.props.accept} name={this.props.name} checked={this.props.checked} readOnly={this.props.readonly} disabled={this.props.disabled} style={this.props.readonly || this.props.disabled ? readOnlyText : null}/>;
  }
}

Input.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  mapKey: PropTypes.string,
  required: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  name: PropTypes.string,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Input;
