import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Label extends Component {
  render(){
    return <label  htmlFor= {this.props.for} >{this.props.value}</label>;
  }  
}

Label.propTypes = {
  for: PropTypes.string,
  value: PropTypes.string
};

export default Label;