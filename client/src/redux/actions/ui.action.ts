import * as ACTIONS from '../constants';

export const changeView = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.CHANGE_REDUX_PATH,
    payload
  })
}

export const toggleModal = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.OPEN_MODAL,
    payload
  })
}

export const fillModalInfo = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.FILL_MODAL_INFO,
    payload
  })
}

export const setTheme = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SET_THEME,
    payload
  })
}

export const selectTheme = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SELECT_THEME,
    payload
  })
}

export const setCurrentMenuButton = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SET_CURRENT_MENU_BUTTON,
    payload
  })
}

export const setLoginInput = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SET_LOGIN_INPUT,
    payload
  })
}

export const setIsAuthenticated = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SET_IS_AUTHENTICATED,
    payload
  })
}

export const setLoggedUser = (dispatch: any, payload: any) => {
  dispatch({
    type: ACTIONS.SET_LOGGED_USER,
    payload
  })
}
