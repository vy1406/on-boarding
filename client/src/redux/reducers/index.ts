import { combineReducers } from 'redux';

import UiReducer from './ui.reducer';
import MainReducer from './main.reducer';

export default combineReducers({
  main : MainReducer,
  ui : UiReducer
})