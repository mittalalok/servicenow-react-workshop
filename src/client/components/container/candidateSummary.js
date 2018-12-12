import React, { Component } from 'react';
import Label from '../forms/label';
import PropTypes from 'prop-types';
import HorizontalRule from '../presentational/forms/horizontalRule';
import Modal from '../presentational/modal/index.jsx';
import { connect } from 'react-redux';
import CandidateStatus from '../forms/candidateStatus.jsx';

class CandidateSummary extends Component {

  constructor(props){
    super(props);
    this.state = { showSummary: true, modalOpen: true };
    this.showSummary = this.showSummary.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.modal = null;
  }

  InputTag(obj) {
    let type = obj.type;
    let value = obj.value;
    let options = obj.enum;

    switch (type) {
    case 'radio':
      for(let option in options){
        if(options[option] == value)
          return <span key={options[option]}>{options[option]}</span>;
      }
      break;
    case 'date':
      return <span>{value}</span>;
    case 'file':
      return <span>{value}</span>;
    default:
      return <span>{value}</span>;

    }
  }

  showSummary(){
    this.setState({ showSummary: !this.state.showSummary });
  }
  updateStatus(){
    console.log(this.state);
    this.setModalState();
  }
  displayModal(){
    this.modal = <Modal isOpen={this.state.modalOpen}>
      <CandidateStatus state={this.state}/>
      <button onClick={() => this.updateStatus()} className="btn btn-primary" >Submit</button>
    </Modal>;
  }
  setModalState(){
    this.setState({ modalOpen: !this.state.modalOpen });
    this.displayModal();
  }
  schedule_next_round(){
    alert('schedule_next_round');
    // this.setState({ status: this.state.status });
  }

  getTag(obj, key) {
    let tag = obj.tag;
    let lableValue = obj.name;
    let required = obj.required === true;
    if(this.state.showSummary){
      if(required){
        switch (tag) {
        case 'input':
          return <div className="form-group col-sm-6" key={lableValue}>
            <Label for={key} value={lableValue} class="col-sm-6 col-form-label" required={required}/>
            <div className="col-sm-6" align='left'>
              {this.InputTag(obj)}
            </div>
          </div>;

        default:
          break;
        }}
    }
    else{
      switch (tag) {
      case 'input':
        return <div className="form-group col-sm-6" key={lableValue}>
          <Label for={key} value={lableValue} class="col-sm-6 col-form-label" required={required}/>
          <div className="col-sm-6" align='left'>
            {this.InputTag(obj, key)}
          </div>
        </div>;
      default:
        break;
      }
    }

  }

  mapKeysToTag(candidate){
    let result = [];
    let summary = '';
    for(let key in candidate){
      if(candidate.hasOwnProperty(key)) {
        result.push(this.getTag(candidate[key], key));
      }
    }
    if(this.state.showSummary){
      summary = 'More Info';
    }
    else{
      summary = 'Show Less';
    }
    return <form>{result}
      <button onClick={() => this.showSummary()} className="btn btn-primary" >{summary}</button>
      <button onClick={() => this.setModalState()} className="btn btn-primary" >Update Status</button>
      <button onClick={() => this.schedule_next_round()} className="btn btn-primary" >Schedule Next Round</button>
    </form>;
  }
  render(){
    if(!this.props.mapper)
      return null;
    let template = <div><HorizontalRule />{this.mapKeysToTag(this.props.mapper)}{this.modal}</div>;
    return template;
  }
}

CandidateSummary.propTypes = {
  mapper: PropTypes.object,
  displaySummary: PropTypes.bool,
  status: PropTypes.number
};

const mapDispatchToProps = () => ({});

function mapStateToProps(state){
  return { mapper: state.form.mapper, status: state.form.status };
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSummary);
