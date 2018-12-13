import React from 'react';
import SearchBox from '../searchBox';

export default class Login extends React.PureComponent {
  render() {
    return <div>
      <div className="row">
        <div className="col-sm-5">
          <form style={{ textAlign: 'left' }}>
            <div className="form-group">
              <label htmlFor="event-input-title" className="control-label">Title</label>
              <div>
                <input className="form-control" id="event-input-title" placeholder="title"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-input-description" className="control-label">Description</label>
              <div>
                <textarea rows="7" className="form-control" id="event-input-description" placeholder="Description"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-input-status" className="control-label">
                Status
              </label>
              <div>ON/OFF</div>
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
            <div className="form-group">
              <label htmlFor="event-input-vacancies" className="col-sm-6 control-label">
                Vacancies
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="event-input-vacancies"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-input-min-experience" className="col-sm-6 control-label">
                Min. Experience (mts)
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="event-input-min-experience"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-input-max-experience" className="col-sm-6 control-label">
                Max. Experience (mts)
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="event-input-max-experience"/>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="event-input-business-unit" className="col-sm-6 control-label">
                Business Unit
              </label>
              <div className="col-sm-6">
                <SearchBox/>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="event-input-hiring-manager" className="col-sm-6 control-label">
                Hiring Manager
              </label>
              <div className="col-sm-6">
                <SearchBox/>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="event-input-hr-contact" className="col-sm-6 control-label">
                HR Contact
              </label>
              <div className="col-sm-6">
                <SearchBox/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="event-input-candidate-list" className="col-sm-6 control-label">
                Candidates
              </label>
              <div className="col-sm-6" style={{ textAlign: 'left' }}>
                <a href="javascript:void(0)" className="btn glyphicon glyphicon-user" aria-hidden="true"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-input-candidate-list" className="col-sm-6 control-label">
                Interviewers
              </label>
              <div className="col-sm-6" style={{ textAlign: 'left' }}>
                <a href="javascript:void(0)" className="btn glyphicon glyphicon-user" aria-hidden="true"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr/>
      <form>
        <div className="form-group">
          <div className="col-sm-offset-10 col-sm-2">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>;
  }
}
