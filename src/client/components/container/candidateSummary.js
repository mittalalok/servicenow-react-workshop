import React, { Component } from 'react';
import Label from '../forms/label';
import PropTypes from 'prop-types';
import Modal from '../presentational/modal/index.jsx';
import { connect } from 'react-redux';
import CandidateStatus from '../forms/candidateStatus.jsx';
import { saveForm } from '../../actions/form';
import ScheduleNextRound from './schedule_next_round';
import { scheduleNextRound } from '../../actions/form';

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

  setModalState(arg){
    this.setState({ modalOpen: !this.state.modalOpen });
    if(arg == 'updateStatus'){
      this.updateStatusModal();
    } else {
      this.schedule_next_round();
    }
  }

  updateStatus(arg){
    if(arg == 'updateStatus'){
      let candidateStatus = this.props.form.candidateStatus;
      if(candidateStatus){
        this.props.saveForm(candidateStatus);
      }
    }
    else{
      let round = { interview: this.props.form.selectedUser, date: this.props.form.nextRoundDate };
      this.props.scheduleNextRound(round);
    }
    this.setModalState();
  }

  updateStatusModal(){
    this.modal = <Modal isOpen={this.state.modalOpen}>
      <CandidateStatus state={this.state}/>
      <button onClick={() => this.updateStatus('updateStatus')} className="btn btn-primary" >Submit</button>
    </Modal>;
  }

  schedule_next_round(){
    this.modal = <Modal isOpen={this.state.modalOpen}>
      <ScheduleNextRound />
      <button className="btn btn-primary" onClick={() => this.updateStatus()} >Schedule Round</button>
      <span></span>
    </Modal>;
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
      <button onClick={() => this.setModalState('updateStatus')} className="btn btn-primary" >Update Status</button>
      <button onClick={() => this.setModalState('scheduleNextRoundModal')} className="btn btn-primary" >Schedule Next Round</button>
    </form>;
  }
  render(){
    if(!this.props.mapper)
      return null;
    let template = <div>{this.mapKeysToTag(this.props.mapper)}{this.modal}</div>;
    return template;
  }
}

CandidateSummary.propTypes = {
  mapper: PropTypes.object,
  displaySummary: PropTypes.bool,
  status: PropTypes.number,
  saveForm: PropTypes.func,
  form: PropTypes.object,
  scheduleNextRound: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  saveForm: payload => dispatch(saveForm(payload)),
  scheduleNextRound: (data) => {
    dispatch(scheduleNextRound(data));
  }
});

function mapStateToProps(state){
  let mapper = state.lists.mapper != undefined ? state.lists.mapper : state.form.mapper;
  return { mapper: mapper, status: state.form.status, form: state.form };
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSummary);
