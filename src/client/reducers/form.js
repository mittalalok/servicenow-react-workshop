import Mapper from '../utils/typeMapping';

export const form = (state = 0, action) => {
  switch (action.type) {
  case 'fetch_from':
    return { ...state, mapper: Mapper};
  default:
    return { ...state, mapper: Mapper};
  }
};