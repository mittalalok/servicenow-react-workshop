import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../searchDropDown/index';
import EventForm from './event/index';
import { requestData, requestById, searchEvent, updateEventList, hoveredEvent, selectedEvent, createNewEvent } from '../../../actions/manager';

import { connect } from 'react-redux';
const stateToProps = (state) => {
  return {
    selectedRole: state.manager.selectedRole,
    selectedUser: state.manager.selectedUser,
    eventSearchBoxIsLoading: state.manager.eventSearchBoxIsLoading,
    eventList: state.manager.eventList,
    showEventSearchDropDown: state.manager.showEventSearchDropDown,
    currentHoveredUserIndex: state.manager.currentHoveredUserIndex,
    selectedEvent: state.manager.selectedEvent,
    isEventNew: state.manager.isEventNew
  };
};

const dispatchToProps = (dispatch, state) => {
  return {
    searchEventHandler: (val) => {
      if (!val) {
        dispatch(updateEventList([]));
        return;
      }
      dispatch(searchEvent());
      dispatch(requestData('requirements', 'description', val, (d) => {
        dispatch(updateEventList(d));
      }));
    },
    handleDropDownHover: (ind) => {
      if (typeof(ind) !== 'undefined') {
        dispatch(hoveredEvent(ind));
      }
    },
    onEventSelected: (entity) => {
      dispatch(selectedEvent(entity));
    },
    onCreateEvent: () => {
      dispatch(createNewEvent());
    },
    getData: (params, cb) => {
      dispatch(requestById('requirements', params.id, cb));
    }
  };
};

const MAX = 50;
const dottify = (str) => {
  if (str.length <= MAX) return str;
  else return str.substring(0, MAX-3) + '...';
};


class MainView extends React.PureComponent {
  static propTypes = {
    searchEventHandler: PropTypes.func.isRequired,
    onEventSelected: PropTypes.func.isRequired,
    eventSearchBoxIsLoading: PropTypes.bool.isRequired,
    isEventNew: PropTypes.bool.isRequired,
    selectedEvent: PropTypes.any,
    eventList: PropTypes.arrayOf(Object)
  };

  render() {
    return (<div className="">
      <form className="form-horizontal">
        <div className="form-group has-feedback">
          <div className="col-sm-4">
            <SearchBox placeholderText="Search for an event..."
              mapping={(d) => dottify(d.description) }
              onSearch={this.props.searchEventHandler.bind(this)}
              onSelect={this.props.onEventSelected.bind(this)}
              data={this.props.eventList}
              isSearching={this.props.eventSearchBoxIsLoading}/>
          </div>
          <div className="col-sm-4">
            <div className="btn btn-default" onClick={this.props.onCreateEvent.bind(this)}> Create New Event </div>
          </div>
        </div>
      </form>
      <hr/>
      { this.props.selectedEvent && <EventForm model={this.props.selectedEvent} dataService={this.props.getData.bind(this)}/> }
      { this.props.isEventNew && <EventForm dataService={this.props.getData.bind(this)}/> }
    </div>);
  }
}

const ConnectedMainView = connect(
  stateToProps,
  dispatchToProps)(MainView);

export default ConnectedMainView;
