import React, { Component } from 'react';
import Label from '../forms/label';
import Input from '../forms/input';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { saveForm } from '../../actions/form';

class RenderForm extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.state = {payload:{}};
  }

  handleChange(key, value){
    let obj = {};
    obj[key] = value;
    this.setState({payload:{...this.state.payload, ...obj}});
  }

  saveForm(event){
    event.preventDefault();
    this.props.saveForm(this.state.payload);
  }

  getTag(obj, key) {
    let tag = obj.html && obj.html.tag;
    let type = obj.html && obj.html.type;
    let lableValue = obj.html && obj.html.name;
    let value = obj.html && obj.html.value;
    switch (tag) {
    case 'input':
      return <div className="form-group row" key={lableValue}>
        <Label for="sample" value={lableValue} class="col-sm-2 col-form-label"/>
        <div className="col-sm-10">
          <Input class="form-control" type={type}  mapKey={key} placeHolder={`Enter ${key}`} value={value} handleChange={this.handleChange}/>
        </div>
      </div>;
      
    default:
      break;
    }
  }



  mapKeysToTag(candidate){
    let result = [];
    for(let key in candidate){
      if(candidate.hasOwnProperty(key)) {
        result.push(this.getTag(candidate[key], key));
      }
    }
    
    return <form onSubmit={this.saveForm}>{result}<button className="btn btn-primary" type="submit">Submit form</button></form>;
  }
  render(){
    if(!this.props.mapper)
      return null;
    return this.mapKeysToTag(this.props.mapper.candidate);
  }
}

RenderForm.propTypes = {
  mapper: PropTypes.object,
  saveForm: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  saveForm : payload => dispatch(saveForm(payload))
});

function mapStateToProps(state){
  return {mapper: state.form.mapper};
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderForm);