import React, { Component } from 'react';
import Label from '../forms/label';
import Input from '../forms/input';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { saveForm } from '../../actions/form';
import  Toast  from '../forms/toast';

class RenderForm extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.state = { payload:{} };
    this.save = true;
    this.invalidField = { name: '', status: false };
  }

  handleChange(key, value){
    let obj = {};
    obj[key] = value;
    this.validate(obj);
  }

  validateEmail(email){
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  validate(arg){
    if(arg.length <= 0)
      this.save = false;

    if(arg.expertise)
      arg.expertise = arg.expertise.toLowerCase();

    if(arg.email)
      if(!this.validateEmail(arg.email)){
        this.invalidField.status = true;
        this.invalidField.name = 'email';
        this.save = false;
      }
      else{
        this.invalidField.status = false;
        this.save = true;
      }

    if(arg.mobile){
      if(arg.mobile.length < 10){
        this.invalidField.status = true;
        this.invalidField.name = 'mobile';
        this.save = false;
      }
      else{
        this.invalidField.status = false;
        this.invalidField.name = 'mobile';
        this.save = true;
      }
    }

    this.setState({ payload:{ ...this.state.payload, ...arg } });
    return this.save;
  }

  saveForm(event){
    event.preventDefault();

    if(this.validate(this.state.payload))
      this.props.saveForm(this.state.payload);
    else
      alert('Error in submitting the form');
  }
  InputTag(obj, key) {
    let type = obj.type;
    let value = obj.value;
    let required = obj.required === true;
    let minlength = obj.minlength;
    let maxlength = obj.maxlength;
    let options = obj.enum;
    let tag = [];
    let checked = false;

    switch (type) {
    case 'radio':
      for(let option in options){
        if(options[option] == value)
          checked = true;
        tag.push(<span key={options[option]}><Input class="form-control radio-inline" type={type}  mapKey={key} value={options[option]} handleChange={this.handleChange} required={required} name={key} checked={checked}/>{options[option]}</span>);
      }
      return tag;
    case 'date':
      return <Input class="form-control" type={type}  mapKey={key} placeHolder={`Enter ${key}`} value={value} handleChange={this.handleChange} required={required} name={key} />;
    case 'file':
      return <Input class="form-control" type={type}  mapKey={key} placeHolder={`Enter ${key}`} value={value} handleChange={this.handleChange} required={required} name={key} accept='application/pdf'/>;
    default:
      return <Input class="form-control" type={type}  mapKey={key} placeHolder={`Enter ${key}`} value={value} handleChange={this.handleChange} required={required} name={key} min={minlength} max={maxlength}/>;

    }
  }

  getTag(obj, key) {
    let tag = obj.tag;
    let lableValue = obj.name;
    let required = obj.required === true;

    switch (tag) {
    case 'input':
      return <div className="form-group col-sm-6" key={lableValue}>
        <Label for={key} value={lableValue} class="col-sm-6 col-form-label" required={required}/>
        <div className="col-sm-6">
          {this.InputTag(obj, key)}
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
    let toast = '';
    if(this.invalidField.status){
      toast = <Toast invalidField={this.invalidField.status} field={this.invalidField.name} status={this.props.status}/>;
    }
    else{
      toast = <Toast status={this.props.status} />;
    }
    let template = <div> {toast} {this.mapKeysToTag(this.props.mapper)}</div>;
    return template;
  }
}

RenderForm.propTypes = {
  mapper: PropTypes.object,
  saveForm: PropTypes.func,
  status: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  saveForm : payload => dispatch(saveForm(payload))
});

function mapStateToProps(state){
  return { mapper: state.form.mapper, status: state.form.status };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderForm);
