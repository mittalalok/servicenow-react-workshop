import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Toast extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let suceess = <div className="alert alert-success" role="alert">Record saved successfully</div>;
    let danger = <div className="alert alert-danger" role="alert">Record not saved</div>;
    let error = <div className="alert alert-danger" role="alert">Invalid input for {this.props.field}</div>;
    let result = null;
    if(!this.props.status && !this.props.invalidField)
      return null;
    if(this.props.invalidField)
      result = error;
    else if(this.props.status === 200)
      result = suceess;
    else if(this.props.status !== 200)
      result = danger;
    window.scrollTo(0, 0);
    return result;
  }
}

Toast.propTypes = {
  status : PropTypes.number,
  invalidField: PropTypes.bool,
  field: PropTypes.string
};
