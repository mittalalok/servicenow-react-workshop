import Mapper from '../utils/typeMapping';

import {getSchemaName} from '../utils/helper';

let appendPayLoad = (data, Mapper, domain) => {
  let schemaName = getSchemaName(domain);
  console.log('schema name ', schemaName);
  console.log('Mapper', Mapper);
  for(let item in data){
    if(data.hasOwnProperty(item)){
      if(Mapper[schemaName][item] && Mapper[schemaName][item].html){
        Object.assign(Mapper[schemaName][item].html, {value: data[item]});
      }
    }
  }
  return Mapper[schemaName];
};

export const form = (state = 0, action) => {
  switch (action.type) {
  case 'fetch_form':
    return { ...state, mapper: appendPayLoad(action.payload, Mapper, action.domain)};
  default:
    return { ...state};
  }
};