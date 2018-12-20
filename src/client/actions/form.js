export function form() {
  return {
    type: 'fetch_from',
  };
}

export function saveForm(payload){
  return {
    type: 'save_form',
    payload
  };
}

export function setCandidateStatus(payload){
  return {
    type: 'set_candidate_status',
    payload
  };
}

export function requestingData() {
  return {
    type: 'requesting_data',
  };
}

export function requestData(params, callBackHandler) {
  return {
    type: 'api-search',
    params: params,
    callBackHandler: callBackHandler
  };
}

export function updateUserList(data) {
  return {
    type: 'update_user_list',
    data: data
  };
}

export function selectedUser(data) {
  return {
    type: 'selected_user',
    data: data
  };
}


export function hoveredUser(ind) {
  return {
    type: 'hovered_user',
    index: ind
  };
}

export function nextRoundDate(date) {
  return {
    type: 'next_round_date',
    date: date
  };
}

export function scheduleNextRound(data) {
  return {
    type: 'schedule_next_round',
    data: data
  };
}
