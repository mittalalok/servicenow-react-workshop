import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Label extends Component {
  render(){
    return <lable htmlFor={this.props.for} value= {this.props.value} />;
  }  
}

Label.propTypes = {
  for: PropTypes.string,
  value: PropTypes.string
};

export default Label;