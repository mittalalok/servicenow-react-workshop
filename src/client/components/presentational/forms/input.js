import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Input extends Component {
    constructor(props){
        super(props);
        this.state = { value : this.props.value };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({ value: event.target.value });
        this.props.handleChange(this.props.mapKey, event.target.value);
    }
    render(){
        return <input className = {this.props.class}  type = {this.props.type} id = {this.props.id} placeholder = {this.props.placeHolder}
            onChange = {this.handleChange} 
            value = {this.state.value}/>;
    }  
}

Input.propTypes = {
    class: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeHolder: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    mapKey: PropTypes.string
};

export default Input;