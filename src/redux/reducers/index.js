/*
 * In redux, reducers produce the state (must be 'pure')
 * 1st arg: current state
 * 2nd arg: action
 */

import { LOGGED, USER } from '../../assets/constants/actiontypes';

const initState = {
  logged: false,
  user: {}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGGED:
      return Object.assign({}, state, {
        logged: action.logged
      });
    case USER:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
};

export default reducer;
