import { LOGGED, USER } from '../../assets/constants/actiontypes';

/* action creators */
export const toggleLogged = logged => ({
  type: LOGGED,
  logged
});

export const saveUserInfo = user => ({
  type: USER,
  user
});
