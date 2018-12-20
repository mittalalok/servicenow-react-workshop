import Mapper from '../utils/typeMapping';

import { getSchemaName } from '../utils/helper';

let appendPayLoad = (data, Mapper, domain) => {
  let schemaName = getSchemaName(domain);
  for(let item in data){
    if(data.hasOwnProperty(item)){
      if(Mapper[schemaName][item] && Mapper[schemaName][item]){
        Object.assign(Mapper[schemaName][item], { value: data[item] });
      }
    }
  }
  return Mapper[schemaName];
};

export const form = (state, action) => {
  switch (action.type) {
  case 'fetch_form':
    return { ...state, mapper: appendPayLoad(action.payload, Mapper, action.domain), status: action.status };
  case 'set_candidate_status':
    return { ...state, status: action.status, candidateStatus: action.payload };
  case 'requesting_data':
    return  { ...state, requestingData: true, showDropdown: true, loginButtonEnabled: false, selectedUser: null, currentHoveredUserIndex: 0 };
  case 'update_user_list':
    return { ...state, requestingData: false, users: action.data };
  case 'selected_user':
    if(action.data)
      return { ...state, selectedUser: action.data, showDropdown: false, loginButtonEnabled: true };
    else
      return { ...state, selectedUser: null, showDropdown: false, loginButtonEnabled: false };
  case 'hovered_user':
    return { ...state, currentHoveredUserIndex: action.index };
  case 'next_round_date':
    return { ...state, nextRoundDate: action.date };
  case 'schedule_next_round':
    return { ...state, nextRound: action.data };
  default:
    return { ...state, status: action.status };
  }
};
