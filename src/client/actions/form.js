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
