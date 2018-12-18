import React from 'react';
import PropTypes from 'prop-types';

import Switch from '../../forms/switch';
import SearchBox from '../../searchDropDown/index';
import { fetchData } from '../../../../middlewares/rest';
import EventService from '../../../../services/models/events';

function createStateFromModel(state, model) {
  if (model) {
    state.modelId = model._id;
    state.modelTitle = model.description;
    state.modelDescription = model.details;
    state.modelSkills = model.skills;
    state.modelVacancies = model.vacancies;
    state.modelMinExperience = model.min_experience;
    state.modelMaxExperience = model.max_experience;
    state.modelBusinessUnit = model.business_unit;
    state.modelStatus = 'off';
    state.modelHiringManager = '';
    state.modelHrContact = '';
    state.isNewRecord = false;
    state.isFetching = true;
  } else {
    state.modelId = '';
    state.modelTitle = '';
    state.modelDescription = '';
    state.modelStatus = 'off';
    state.modelSkills = [];
    state.modelVacancies = 1;
    state.modelMinExperience = 0;
    state.modelMaxExperience = 480;
    state.modelBusinessUnit = '';
    state.modelHiringManager = '';
    state.modelHrContact = '';
    state.isNewRecord = true;
    state.isFetching = false;
  }
}



export default class EventForm extends React.Component {
  static propTypes = {
    model: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
      hasErrors: false,
      foundBusinessUnits: [],
      foundHiringManagers: [],
      foundHRContacts: [],
    };
    createStateFromModel(this.state, this.props.model);
  }

  fetchDetailedModelAndPopulateState(id) {
    this.props.dataService({ id: id }, (d) => {
      console.log(d);
      this.setState({
        modelId: d._id,
        modelTitle: d.description,
        modelDescription: d.details,
        modelSkills: d.skills,
        modelVacancies: d.vacancies,
        modelMinExperience: d.min_experience,
        modelMaxExperience: d.max_experience,
        modelBusinessUnit: d.business_unit,
        modelStatus: 'off',
        modelHiringManager: d.manager ? d.manager : '',
        modelHrContact: d.hr_contact ? d.hr_contact : '',
        isNewRecord: false,
        isFetching: false
      });
    });
  }

  componentDidMount() {
    if(this.props.model) {
      this.fetchDetailedModelAndPopulateState(this.props.model._id);
    }
  }

  statusChangeHandler(e) { this.setState({ modelStatus: e.target.checked ? 'on' : 'off' }); }
  titleChangeHandler(e) { this.setState({ modelTitle: e.target.value }); }
  descChangeHandler(e) { this.setState({ modelDescription: e.target.value }); }
  vacancyChangeHandler(e) { this.setState({ modelVacancies: e.target.value }); }
  minExpChangeHandler(e) { this.setState({ modelMinExperience: e.target.value }); }
  maxExpChangeHandler(e) { this.setState({ modelMaxExperience: e.target.value }); }
  businessUnitChangeHandler(d) { this.setState({ modelBusinessUnit: d.value }); }
  hiringManagerChangeHandler(d) { this.setState({ modelHiringManager: d }); }
  hrContactChangeHandler(d) { this.setState({ modelHrContact: d }); }


  searchBusinessUnit(val) {
    this.setState({ modelBusinessUnit: '' });
    fetchData({
      keys: [
        { key: 'type', value: 'business_type' },
        { key: 'value', value: val }
      ],
      schema: 'types'
    }).then((d)=>{
      this.setState({ foundBusinessUnits: d });
    }, () => {
      this.setState({ foundBusinessUnits: [] });
    });
  }

  searchHiringManagers(val) {
    this.setState({ modelHiringManager: null });
    fetchData({
      key: 'name',
      search: val,
      schema: 'interviewers'
    }).then((d)=>{
      this.setState({ foundHiringManagers: d });
    }, () => {
      this.setState({ foundHiringManagers: [] });
    });
  }

  searchHRContacts(val) {
    this.setState({ modelHrContact: null });
    fetchData({
      key: 'name',
      search: val,
      schema: 'interviewers'
    }).then((d)=>{
      this.setState({ foundHRContacts: d });
    }, () => {
      this.setState({ foundHRContacts: [] });
    });
  }


  saveHandler() {
    this.setState({ isSaving: true });
    let evtService = new EventService();
    let data = {
      description: this.state.modelTitle,
      details: this.state.modelDescription,
      skills: this.state.modelSkills,
      vacancies: this.state.modelVacancies,
      min_experience: this.state.modelMinExperience,
      max_experience: this.state.modelMaxExperience,
      business_unit: this.state.modelBusinessUnit,
      manager: this.state.modelHiringManager ? this.state.modelHiringManager._id : null,
      hr_contact: this.state.modelHrContact ? this.state.modelHrContact._id : null
    };


    if (this.state.isNewRecord) {
      console.log('Creating....');
      evtService.create(data).then((d) => {
        console.log(d);
        this.setState({ isSaving: false });
        this.fetchDetailedModelAndPopulateState(d.data._id);
      }, (e) => {
        console.error(e);
        this.setState({ isSaving: false });
      });
    } else {
      evtService.update(this.state.modelId, data).then((d) => {
        console.log(d);
        this.setState({ isSaving: false });
        // this.fetchDetailedModelAndPopulateState(d.data._id);
      }, (e) => {
        console.error(e);
        this.setState({ isSaving: false });
      });
    }

    //TODO Call services to save data and reload
  }

  render() {
    if (this.state.isFetching) return <div className="loader-container"><div className="loader"></div></div>;


    let formHasErrors = false;
    let titleHasErrors = this.state.modelTitle.length <= 3;
    let descriptionHasErrors = this.state.modelDescription.length <= 3;
    let vacancyHasErrors = false;
    try {
      let n = parseInt(this.state.modelVacancies);
      vacancyHasErrors = (n < 1);
    } catch(e) {
      vacancyHasErrors = true;
    }

    let minExperienceHasErrors = false;
    try {
      let n = parseInt(this.state.modelMinExperience);
      minExperienceHasErrors = (n < 0);
    } catch(e) {
      minExperienceHasErrors = true;
    }

    let maxExperienceHasErrors = false;
    try {
      let n = parseInt(this.state.modelMaxExperience, 10);
      maxExperienceHasErrors = (n < 0 || n > 480);
    } catch(e) {
      maxExperienceHasErrors = true;
    }

    let businessUnitHasErrors = (this.state.modelBusinessUnit.length === 0);

    formHasErrors = titleHasErrors || descriptionHasErrors;

    return <div>
      <div ref={this.container} className="row">
        <div className="col-sm-5">
          <form style={{ textAlign: 'left' }}>
            <div className={'form-group ' + (titleHasErrors ? 'has-error': '')}>
              <label htmlFor="event-input-title" className="control-label">Title</label>
              <div>
                <input className="form-control" id="event-input-title" placeholder="Title" value={this.state.modelTitle} onChange={this.titleChangeHandler.bind(this)}/>
              </div>
              {titleHasErrors && <span className="help-block">A title must be provided and should be more than 3 characters.</span>}
            </div>
            <div className={'form-group' + (descriptionHasErrors? ' has-error': '')}>
              <label htmlFor="event-input-description" className="control-label">Description</label>
              <div>
                <textarea rows="7" className="form-control" id="event-input-description" placeholder="Description" value={this.state.modelDescription} onChange={this.descChangeHandler.bind(this)}/>
              </div>
              {descriptionHasErrors && <span className="help-block">A description must be provided and should be more than 3 characters.</span>}
            </div>
            <div className="form-group">
              <label htmlFor="event-input-status" className="control-label">
                Status
              </label>
              <div><Switch onChange={this.statusChangeHandler.bind(this)} isDisabled={this.state.isNewRecord} isChecked={this.state.modelStatus === 'on'}/></div>
            </div>
            <div className="form-group">
              <label className="control-label">Skills</label>
              <div>
                TODO
              </div>
            </div>
          </form>
        </div>

        <div className="col-sm-7">
          <form className="form-horizontal">
            <div className={'form-group' + (vacancyHasErrors ? ' has-error': '')}>
              <label htmlFor="event-input-vacancies" className="col-sm-6 control-label">
                Vacancies
              </label>
              <div className="col-sm-6">
                <input type="number" min="0" className="form-control" id="event-input-vacancies"  value={this.state.modelVacancies} onChange={this.vacancyChangeHandler.bind(this)}/>
                {vacancyHasErrors && <span className="help-block">The vacancy should be 1 or more.</span>}
              </div>

            </div>
            <div className={'form-group' + (minExperienceHasErrors ? ' has-error': '')}>
              <label htmlFor="event-input-min-experience" className="col-sm-6 control-label">
                Min. Experience (mts)
              </label>
              <div className="col-sm-6">
                <input type="number" min="0" className="form-control" id="event-input-min-experience" value={this.state.modelMinExperience} onChange={this.minExpChangeHandler.bind(this)}/>
                {minExperienceHasErrors && <span className="help-block">The minimum experience should be 0 or more.</span>}
              </div>
            </div>
            <div className={'form-group' + (maxExperienceHasErrors ? ' has-error': '')}>
              <label htmlFor="event-input-max-experience" className="col-sm-6 control-label">
                Max. Experience (mts)
              </label>
              <div className="col-sm-6">
                <input type="number" min="0" className="form-control" id="event-input-max-experience" value={this.state.modelMaxExperience} onChange={this.maxExpChangeHandler.bind(this)}/>
                {maxExperienceHasErrors && <span className="help-block">The maximum experience should be between 0 and 480.</span>}
              </div>
            </div>
            <div className={'form-group has-feedback'+ (businessUnitHasErrors?' has-error': '')}>
              <label htmlFor="event-input-business-unit" className="col-sm-6 control-label">
                Business Unit
              </label>
              <div className="col-sm-6">
                <SearchBox placeholderText="Search for a business unit..."
                  textValue={this.state.modelBusinessUnit}
                  mapping={(d) => d.value }
                  onSearch={this.searchBusinessUnit.bind(this)}
                  onSelect={this.businessUnitChangeHandler.bind(this)}
                  data={this.state.foundBusinessUnits}
                  isSearching={false}/>
                {businessUnitHasErrors && <span className="help-block">Business rule should be present.</span>}
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="event-input-hiring-manager" className="col-sm-6 control-label">
                Hiring Manager
              </label>
              <div className="col-sm-6">
                <SearchBox placeholderText="Search for a hiring manager..."
                  textValue={this.state.modelHiringManager ? this.state.modelHiringManager.name : ''}
                  mapping={(d) => d.name }
                  onSearch={this.searchHiringManagers.bind(this)}
                  onSelect={this.hiringManagerChangeHandler.bind(this)}
                  data={this.state.foundHiringManagers}
                  isDisabled={this.state.isNewRecord}
                  isSearching={false}/>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="event-input-hr-contact" className="col-sm-6 control-label">
                HR Contact
              </label>
              <div className="col-sm-6">
                <SearchBox placeholderText="Search for an HR contact..."
                  textValue={this.state.modelHrContact ? this.state.modelHrContact.name : ''}
                  mapping={(d) => d.name }
                  onSearch={this.searchHRContacts.bind(this)}
                  onSelect={this.hrContactChangeHandler.bind(this)}
                  data={this.state.foundHRContacts}
                  isDisabled={this.state.isNewRecord}
                  isSearching={false}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-6 col-sm-6" style={{ textAlign: 'left' }}>
                <a className='btn btn-default' href="javascript:void()"
                  disabled={this.state.isNewRecord ? 'disable': ''}>
                  Manage Selections
                  &nbsp;
                  <i className="glyphicon glyphicon-user"/>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr/>
      <form>
        <div className="form-group">
          <div className="col-sm-offset-8 col-sm-2">
            <button className="btn btn-default">Cancel</button>
          </div>
          <div className="col-sm-2">
            {this.state.isSaving && <div className="loader-container"><div className="loader"></div></div>}
            {!this.state.isSaving && <button type="submit" className="btn btn-primary" onClick={this.saveHandler.bind(this)} disabled={!formHasErrors ? '' : 'disabled'}>Save</button>}
          </div>
        </div>
      </form>
    </div>;
  }
}
