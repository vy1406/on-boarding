export interface mainInterface {
  arrProjects: any[];
  arrTasks: any[];
  currentProject: any;
}

export const mainInitialState: mainInterface = {
  arrProjects: [],
  arrTasks: [],
  currentProject: { name: "" }
}
