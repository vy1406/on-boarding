import { mainInterface, mainInitialState } from "../state/main.store";
import * as CONSTS from '../constants'

const mainReducer = (state: mainInterface = mainInitialState, action: any): mainInterface => {
  switch (action.type) {

    // -----------------------------------------
    // PROJECT 
    // ----------------------------------------- 

    case CONSTS.PROJECT_ADD:
      return { ...state, arrProjects: action.payload }

    case CONSTS.PROJECT_DELETE:
      return { ...state, arrProjects: action.payload }

    case CONSTS.PROJECT_UPDATE:
      return { ...state, arrProjects: action.payload }

    case CONSTS.PROJECTS_FETCH:
      return { ...state, arrProjects: action.payload }

    case CONSTS.CURRENT_PROJECT:
      return { ...state, currentProject: action.payload }

    // -----------------------------------------
    // TASK 
    // ----------------------------------------- 

    case CONSTS.TASKS_FETCH:
      return { ...state, arrTasks: action.payload }

    case CONSTS.TASK_ADD:
      return { ...state, arrTasks: action.payload }

    case CONSTS.TASK_DELETE:
      return { ...state, arrTasks: action.payload }

    case CONSTS.TASK_UPDATE:
      return { ...state, arrTasks: action.payload }

    default:
      return state;
  }
}

export default mainReducer;