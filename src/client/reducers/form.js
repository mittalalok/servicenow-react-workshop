import Mapper from '../utils/typeMapping';

let appendPayLoad = (data, Mapper) => {
  for(let item in data){
    if(data.hasOwnProperty(item)){
      if(Mapper.candidate[item] && Mapper.candidate[item].html){
        Object.assign(Mapper.candidate[item].html, {value: data[item]});
      }
    }
  }
  return Mapper;
};

export const form = (state = 0, action) => {
  switch (action.type) {
  case 'fetch_form':
    return { ...state, mapper: appendPayLoad(action.payload, Mapper)};
  default:
    return { ...state};
  }
};