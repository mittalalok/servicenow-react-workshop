import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Input extends Component {
  render(){
    return <input className = {this.props.class}  type = {this.props.type} id = {this.props.id} placeholder = {this.props.placeHolder} value = {this.props.value}/>;
  }  
}

Input.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
};

export default Input;