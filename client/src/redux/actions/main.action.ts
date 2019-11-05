import * as ACTIONS from '../constants';

// -----------------------------------
// PROJECTS
// -----------------------------------

export const addProject = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.PROJECT_ADD, payload }) }

export const deleteProject = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.PROJECT_DELETE, payload }) }

export const updateProject = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.PROJECT_UPDATE, payload }) }

export const fetchProjects = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.PROJECTS_FETCH, payload }) }

export const setCurrentProject = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.CURRENT_PROJECT, payload }) }

// -----------------------------------
// TASK
// -----------------------------------

export const fetchTasks = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.TASKS_FETCH, payload }) }

export const updateTask = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.TASK_UPDATE, payload }) }

export const addTask = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.TASK_ADD, payload }) }

export const deleteTask = (dispatch: any, payload: any) => { dispatch({ type: ACTIONS.TASK_DELETE, payload }) }

