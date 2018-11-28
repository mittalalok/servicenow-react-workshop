import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Label extends Component {
  render(){
    return <label  className = {this.props.class} htmlFor= {this.props.for} >{this.props.value}</label>;
  }  
}

Label.propTypes = {
  for: PropTypes.string,
  value: PropTypes.string,
  class: PropTypes.string,
};

export default Label;