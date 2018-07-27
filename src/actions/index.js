import { LOGGED } from '../constants/actiontypes';

/* action creators */
export const toggleLogged = logged => ({
  type: LOGGED,
  logged
});
