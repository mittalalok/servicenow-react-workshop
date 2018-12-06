import React, {Component} from 'react';
import PropTypes from 'prop-types';

const requiredStyle = {
  color: 'red'
};

class Label extends Component {
  render(){
    return <label  className = {this.props.class} htmlFor= {this.props.for} >{this.props.value}<span style={requiredStyle}>{this.props.required ? ' * ' : null}</span></label>;
  }
}

Label.propTypes = {
  for: PropTypes.string,
  value: PropTypes.string,
  class: PropTypes.string,
  required: PropTypes.bool
};

export default Label;
