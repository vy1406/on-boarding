import { uiInterface, uiInitialState } from "../state/ui.store";
import * as CONSTS from '../constants'

const uiReducer = (state: uiInterface = uiInitialState, action: any): uiInterface => {
  switch (action.type) {

    case CONSTS.CHANGE_REDUX_PATH:
      return { ...state, path: action.payload }

    case CONSTS.OPEN_MODAL:
      return { ...state, isModalOpen: action.payload }

    case CONSTS.FILL_MODAL_INFO:
      return { ...state, modalInfo: action.payload }

    case CONSTS.SET_THEME:
      return { ...state, theme: action.payload }

    case CONSTS.SET_CURRENT_MENU_BUTTON:
      return { ...state, currentSelectedMenuBtn: action.payload }

    case CONSTS.SELECT_THEME:
      return { ...state, selectedTheme : action.payload }
      
    case CONSTS.SET_LOGIN_INPUT:
      return { ...state, loginInput : action.payload }
    
    case CONSTS.SET_IS_AUTHENTICATED:
        return { ...state, isAuthenticated: action.payload}
    
    case CONSTS.SET_LOGGED_USER:
        return { ...state, loggedUser: action.payload}

    default:
      return state;
  }
}

export default uiReducer;