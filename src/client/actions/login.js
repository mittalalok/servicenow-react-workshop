export const EventTypes = {
  selectRole: 'login:select_role',
  requestingData: 'login:requesting_data',
  updateUserList: 'login:update_user_list',
  selectedUser: 'login:selected_user',
};

export function selectRole(index) {
  return {
    type: EventTypes.selectRole,
    index: index
  };
}

export function requestingData() {
  return {
    type: EventTypes.requestingData,
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
    type: EventTypes.updateUserList,
    data: data
  };
}

export function selectedUser(data) {
  return {
    type: EventTypes.selectedUser,
    data: data
  };
}
