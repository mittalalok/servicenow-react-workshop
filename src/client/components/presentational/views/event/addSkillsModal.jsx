import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import Modal from '../../modal/index';
import TagService from '../../../../services/models/tags';
import logger from '../../../../services/logger';

class AddSkillsModal extends React.Component {
  static defaultProps = {
    onClose: () => {},
    onDone: () => {}
  };
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      itemsToAdd: [],
      itemsAdded: []
    };
    this.delayedCallback = debounce((val) => {
      this.searchData(val);
    }, 100);
  }

  searchData(srch) {
    let ts = new TagService();
    ts.getForValue(srch).then((d)=>{
      let data = d.data.data;
      let toAdd = [];
      data.forEach((m) => {
        let found = this.state.itemsAdded.find((n) => n._id === m._id);
        if (!found) toAdd.push(m);
      });
      this.setState({ itemsToAdd: toAdd });
    }, logger.error);
  }

  addItem(id) {
    let itm = this.state.itemsToAdd.find((m) => m._id === id);
    let toAdd = this.state.itemsToAdd.filter((d) => d._id !== id);
    let added = this.state.itemsAdded.splice(0, this.state.itemsAdded.length);
    added.push(itm);
    this.setState({ itemsToAdd: toAdd, itemsAdded: added });
  }

  removeItem(id) {
    let itm = this.state.itemsAdded.find((m) => m._id === id);
    let added = this.state.itemsAdded.filter((d) => d._id !== id);
    let toAdd = this.state.itemsToAdd.splice(0, this.state.itemsToAdd.length);
    toAdd.push(itm);
    this.setState({ itemsToAdd: toAdd, itemsAdded: added });
  }

  handleTextChange(e) {
    this.delayedCallback(e.target.value);
  }

  handleClose() {
    this.setState({ showModal: false });
    this.props.onClose();
  }

  handleDone() {
    let added = this.state.itemsAdded.splice(0, this.state.itemsAdded.length);
    this.props.onDone(added);
    this.setState({ itemsAdded: [], itemsToAdd: [], showModal: false });
  }


  render() {
    return <Modal isOpen={this.state.showModal}>
      <button onClick={this.handleClose.bind(this)} className='skills-modal-close-btn glyphicon glyphicon-remove'></button>
      <div className="skills-modal-content">
        <h4> Add Skills </h4>
        <hr/>
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group has-feedback">
              <input className="form-control" type="text" placeholder="Search..." onChange={this.handleTextChange.bind(this)}/>
              <span className="glyphicon glyphicon-search form-control-feedback"
                aria-hidden="true"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <ul className="to-add-list">
              {
                this.state.itemsToAdd.map((d) => {
                  return <li onClick={()=>this.addItem(d._id)} key={d._id} ><a href="javascript:void(0)"> {d.value} <span className="remove-item"> + </span></a></li>;
                })
              }
            </ul>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <ul className="added-list">
              {
                this.state.itemsAdded.map((d) => {
                  return <li onClick={()=>this.removeItem(d._id)} key={d._id} ><a href="javascript:void(0)"> {d.value} <span className="remove-item"> - </span></a></li>;
                })
              }
            </ul>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-offset-6 col-sm-3">
            <a className="btn btn-default" onClick={this.handleClose.bind(this)}>Cancel</a>
          </div>
          <div className="col-sm-3">
            <a className="btn btn-primary" onClick={this.handleDone.bind(this)}>Done</a>
          </div>
        </div>
      </div>
    </Modal>;
  }
}

export default AddSkillsModal;
