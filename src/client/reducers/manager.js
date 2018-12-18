import { EventTypes } from '../actions/manager';
const initialState = {
  selectedRole: null,
  selectedUser: null,
  eventSearchBoxIsLoading: false,
  eventList: [],
  showEventSearchDropDown: false,
  currentHoveredUserIndex: 0,
  selectedEvent: null,
  isEventNew: false
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
  case EventTypes.searchEvent:
    return Object.assign(state, { showEventSearchDropDown: true, eventSearchBoxIsLoading: true });
  case EventTypes.updateEventList:
    return Object.assign(state, { eventSearchBoxIsLoading: false,  eventList: action.data });
  case EventTypes.hoveredEvent:
    return Object.assign(state, { currentHoveredUserIndex: action.index });
  case EventTypes.selectedEvent:
    return Object.assign(state, { selectedEvent: action.data, showEventSearchDropDown: false, isEventNew: false });
  case EventTypes.createNewEvent:
    return Object.assign(state, { selectedEvent: null, isEventNew: true, showEventSearchDropDown: false });
  default:
    return state;
  }
};

export default mainReducer;
