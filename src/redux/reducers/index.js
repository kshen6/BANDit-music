/*
 * In redux, reducers produce the state (must be 'pure')
 * 1st arg: current state
 * 2nd arg: action
 */

import { LOGGED } from '../../assets/constants/actiontypes';

const initState = {
  logged: false,
  user: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGGED:
      return Object.assign({}, state, {
        logged: action.logged
      });
    default:
      return state;
  }
};

export default reducer;
