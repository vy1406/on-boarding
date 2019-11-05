import React from 'react'
import './TasksComponent.css'
import { connect } from 'react-redux';
import { addTask, updateTask, deleteTask, fetchTasks, updateProject, fetchProjects, setCurrentProject } from '../../redux/actions/main.action';
import { fillModalInfo, toggleModal } from '../../redux/actions/ui.action'
import axios from 'axios';

interface MainProps {
  addTask: (arrTasks: any) => void;
  deleteTask: (arrTasks: any) => void;
  updateTask: (arrTasks: any) => void;
  fetchTasks: (arrTasks: any) => void;
  updateProject: (arrProjects: any[]) => void;
  fetchProjects: (arrProjects: any[]) => void;
  fillModalInfo: (modalInfo: any) => void;
  toggleModal: (isOpenModal: boolean) => void;
  setCurrentProject: (currentProject: any) => void;

  loggedUser: any;
  arrProjects: any[];
  arrTasks: any[];
  currentProject: any;
  theme: string;
}

interface TaskState {
  isOpenNewTask: boolean,
  isOpenNewProjectName: boolean,
  projectName: string,
  isHovered: boolean;
  hoveredID: any;
  focus: boolean;
  focusProjectName: boolean;
}

class TasksComponent extends React.Component<MainProps, TaskState> {

  constructor(props) {

    super(props)
    this.state = {
      isOpenNewTask: false,
      isOpenNewProjectName: false,
      projectName: "Project name1", // getting from props.
      isHovered: false,
      hoveredID: null,
      focus: false,
      focusProjectName: false,
    }
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this._onBlurNewNameProject = this._onBlurNewNameProject.bind(this)
    this._onFocusNewNameProject = this._onFocusNewNameProject.bind(this)
  }
  _onBlur() {

    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false,
          isOpenNewTask: false,
        });
      }
    }, 0);
  }
  _onFocus() {

    if (!this.state.focus) {
      this.setState({
        focus: true,
        isOpenNewTask: true,
      });
    }
  }

  _onBlurNewNameProject() {

    setTimeout(() => {
      if (this.state.focusProjectName) {
        this.setState({
          focusProjectName: false,
          isOpenNewProjectName: false
        });
      }
    }, 0);
  }

  _onFocusNewNameProject() {

    if (!this.state.focusProjectName) {
      this.setState({
        focusProjectName: true,
        isOpenNewProjectName: true
      });
    }
  }
  toggleDone = (task_id: string) => {

    const params = {
      task_id,
      project_id: this.props.currentProject.id
    }

    axios.put("http://localhost:5000/task/updatedone", params)
      .then(res => {
        const sorted = res.data.sort((a, b) => a.id - b.id)
        this.props.fetchTasks(sorted)
      })

  }

  itemClass = (t_id: string) => t_id === this.state.hoveredID && this.state.isHovered ? "single_item task selected" : "single_item task"

  handleTaskHover = (flag: boolean, t_id: string) => this.setState({ isHovered: flag, hoveredID: t_id })

  isHovered = (t_id: string) => t_id === this.state.hoveredID && this.state.isHovered

  renderDeleteOption = (t_id: string) => <img src="/images/assets/shared/delete.svg" onClick={() => this.deleteTask(t_id)} alt="" />

  addCrossedIfNeeded = (p: any) => p.isdone ? " text_crossed" : ""

  addNew = () => this.setState({ isOpenNewTask: true })

  submitNewTask = (e: any) => {

    if (e.key === "Enter") {
      const params = { project_id: this.props.currentProject.id, description: e.target.value }

      axios.post("http://localhost:5000/task", params)
        .then(res => {
          const sorted = res.data.sort((a, b) => a.id - b.id)
          this.props.fetchTasks(sorted)
        })

      this.setState({ isOpenNewTask: false })
    }
  }

  renderNewTask = () =>

    <div className="item_wrapper">
      <div className="single_item task selected" >
        <div className="custom_checkbox">
          <img src="/images/dark/checkbox_regular.svg" alt="" />
        </div>
        <div className="item_innerContainer">
          <div className="item_info">
            <input type="text" placeholder="Type Task Name" className="new_input" onKeyPress={this.submitNewTask} onFocus={this._onFocus} onBlur={this._onBlur} autoFocus />
          </div>
        </div>
      </div>
      <div className="separator"></div>
    </div>

  changeProjectName = () => this.setState({ isOpenNewProjectName: true })

  // if you dont understand why you need it, simply delete its invocation, and try updating name. you'll get it.
  findCurrentUpdatedProject = (arrProjects) => {
    const index = arrProjects.findIndex(p => p.id === this.props.currentProject.id)
    return arrProjects[index]
  }

  submitNewProjectName = (e: any) => {

    if (e.key === "Enter") {

      const params = {
        project_id: this.props.currentProject.id,
        newProjectName: e.target.value,
        user_id: this.props.loggedUser.user_id
      }

      axios.put("http://localhost:5000/project/updatename", params)
        .then(res => {
          let sorted = res.data.sort((a, b) => a.id - b.id)
          // sorted = sorted.sort((a, b) => (a.isdone === b.isdone) ? 0 : a.isdone ? 1 : -1);
          this.props.fetchProjects(sorted)

          const curProject = this.findCurrentUpdatedProject(sorted)
          this.props.setCurrentProject(curProject)
          if (this.props.currentProject.id) { // project array is not empty
            axios.get("http://localhost:5000/task?project_id=" + this.props.currentProject.id)
              .then(res => {
                const sorted = res.data.sort((a, b) => a.id - b.id)
                this.props.fetchTasks(sorted)
              })
          }
        })

      this.setState({ isOpenNewProjectName: false, projectName: e.target.value })
    }
  }

  renderNewProjecNameInput = () => {

    return (
      <div className="single_item task selected new_project_name_width" >
        <div className="custom_checkbox">
          <img src="/images/dark/checkbox_regular.svg" alt="" />
        </div>
        <div className="item_innerContainer">
          <div className="item_info">
            <input type="text" placeholder={this.props.currentProject.name} className="new_input" onKeyPress={this.submitNewProjectName} onFocus={this._onFocusNewNameProject} onBlur={this._onBlurNewNameProject} autoFocus />
          </div>
        </div>
      </div>
    )
  }


  deleteTask = (t_id: string) => {

    const index = this.props.arrTasks.findIndex(task => task.id === t_id)

    const modalInfo = {
      title: "Delete \" " + this.props.arrTasks[index].description + "\" ",
      text: "Are you sure you want to remove the task ?",
      leftBtn: "Delete",
      rightBtn: "Cancel",
      function: () => this.callbackDelete(t_id),
    }

    this.props.toggleModal(true)
    this.props.fillModalInfo(modalInfo)
  }

  callbackDelete = (task_id: string) => {

    const params = {
      task_id,
      project_id: this.props.currentProject.id
    }

    axios.delete("http://localhost:5000/task", { data: params })
      .then(res => {
        const sorted = res.data.sort((a, b) => a.id - b.id)
        this.props.fetchTasks(sorted)
      })
  }

  renderItems = () => {

    return (
      this.props.arrTasks.map(t =>
        <div className="item_wrapper" key={t.id}>
          <div className={this.itemClass(t.id)} onMouseEnter={() => this.handleTaskHover(true, t.id)} onMouseLeave={() => this.handleTaskHover(false, t.id)}>
            <div className="custom_checkbox" onClick={() => this.toggleDone(t.id)}>
              <img src="/images/dark/checkbox_regular.svg" alt="" />
              {t.isdone ? <img src={"/images/" + this.props.theme + "/check.svg"} className="check" alt="" /> : null}
            </div>
            <div className="item_innerContainer">
              <div className="item_info">
                <div className={"item_name" + this.addCrossedIfNeeded(t)}>
                  {t.description}
                </div>
                <div>
                  {this.isHovered(t.id) ?
                    this.renderDeleteOption(t.id) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
        </div>
      )
    )
  }

  assignSecondaryTheme = () => this.props.theme === "dark" ? "turquoise" : "dark"

  render() {
    return (
      <div className="tasks wrapper container">
        <div className="header header_padding">
          {this.state.isOpenNewProjectName ?
            this.renderNewProjecNameInput()
            :
            <div className="title" onClick={this.changeProjectName}>
              {this.props.currentProject.name}
            </div>
          }
          <div className="controls" onClick={this.addNew}>
            <div className={"add_text " + this.assignSecondaryTheme() + "-new"}>
              New Task
              </div>
            <div className="add_btn">
              <img src={"/images/" + this.props.theme + "/add_new_project.svg"} alt="" />
            </div>
          </div>
        </div>
        <div className="items">
          {this.state.isOpenNewTask ? this.renderNewTask() : null}
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {

  return {
    arrProjects: state.main.arrProjects,
    arrTasks: state.main.arrTasks,
    theme: state.ui.theme,
    loggedUser: state.ui.loggedUser,
    currentProject: state.main.currentProject
  }
}

const mainActions = (dispatch: any) => {

  return {
    addTask: (payload: any) => addTask(dispatch, payload),
    deleteTask: (payload: any) => deleteTask(dispatch, payload),
    updateTask: (payload: any) => updateTask(dispatch, payload),
    fetchTasks: (payload: any) => fetchTasks(dispatch, payload),
    updateProject: (payload: any) => updateProject(dispatch, payload),
    fetchProjects: (payload: any) => fetchProjects(dispatch, payload),
    setCurrentProject: (payload: any) => setCurrentProject(dispatch, payload),

    toggleModal: (payload: any) => toggleModal(dispatch, payload),
    fillModalInfo: (payload: any) => fillModalInfo(dispatch, payload)
  }
}

export default connect(
  mapStateToProps,
  mainActions,
)(TasksComponent);


