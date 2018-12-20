export const EventTypes = {
  apiSearch: 'generic-api-search',
  apiGetById: 'api-get-by-id',
  searchEvent: 'mgr-view-search-event',
  updateEventList: 'mgr-view-update-event-list',
  hoveredEvent: 'mgr-view-hovered-event',
  selectedEvent: 'mgr-view-selected-event',
  createNewEvent: 'mgr-view-create-new-event',
  cancelEvent: 'mgr-view-cancel-event'
};

export const requestData = (schema, key, value, cb) => {
  return {
    type: EventTypes.apiSearch,
    params: {
      schema,
      key,
      search: value
    },
    callBackHandler: cb
  };
};

export const searchEvent = () => {
  return {
    type: EventTypes.searchEvent
  };
};

export const updateEventList = (data) => {
  return {
    type: EventTypes.updateEventList,
    data: data
  };
};


export const hoveredEvent = (index) => {
  return {
    type: EventTypes.hoveredEvent,
    index
  };
};

export const selectedEvent = (data) => {
  return {
    type: EventTypes.selectedEvent,
    data
  };
};
export const createNewEvent = (data) => {
  return {
    type: EventTypes.createNewEvent,
    data
  };
};

export const cancelEvent = () => {
  return {
    type: EventTypes.cancelEvent
  };
};
