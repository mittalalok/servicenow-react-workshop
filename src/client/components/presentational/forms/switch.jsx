import React from 'react';
import PropTypes from 'prop-types';

const Switch = (props) => {
  const sliderClass = props.isDisabled ? 'slider round disabled' : 'slider round';
  return <label className='switch'>
    {props.isChecked === true && <input type="checkbox" onChange={props.onChange} disabled={props.isDisabled? 'disabled': ''} checked="checked"/>}
    {props.isChecked !== true && <input type="checkbox" onChange={props.onChange} disabled={props.isDisabled? 'disabled': ''}/>}
    <span className={sliderClass}></span>
  </label>;
};


Switch.prototype.propTypes = {
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool
};


export default Switch;
