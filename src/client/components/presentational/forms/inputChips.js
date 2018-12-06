import ChipInput from 'material-ui-chip-input';
import React, { Component } from 'react';

export default class Chips extends Component {
    render(){
        return <ChipInput defaultValue={['foo', 'bar']} />;
    }
}

