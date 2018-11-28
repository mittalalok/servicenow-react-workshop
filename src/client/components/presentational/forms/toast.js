import React, { Component } from 'react';
import PropTyps from 'prop-types';

export default class Toast extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let suceess = <div className="alert alert-success" role="alert">Record saved successfully</div>;
        let danger = <div className="alert alert-danger" role="alert">Record not saved</div>;
        let result = null;
        if(!this.props.status)
            return null;
        if(this.props.status === 200)
            result = suceess;
        else if(this.props.status !== 200)
            result = danger;
        window.scrollTo(0, 0);
        return result;
    }
}

Toast.propTypes = {
    status : PropTyps.number
};
