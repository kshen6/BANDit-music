/*
 * state is immutable
 * store receives an action, then triggers an appropriate reducer
 * reducer then returns the new state
 */

import { createStore } from 'redux';
import reducers from '../reducers/index';

const store = createStore(reducers);

export default store;
