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
