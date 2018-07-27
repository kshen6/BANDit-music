import { LOGGED } from '../../assets/constants/actiontypes';

/* action creators */
export const toggleLogged = logged => ({
  type: LOGGED,
  logged
});
