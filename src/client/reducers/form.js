import Mapper from '../utils/typeMapping';

export const form = (state = 0, action) => {
  switch (action.type) {
  case 'fetch_form':
    return { ...state, mapper: Mapper};
  default:
    return { ...state};
  }
};