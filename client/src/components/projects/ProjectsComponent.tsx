import React from 'react'
import './ProjectsComponent.css';
import { connect } from 'react-redux';
import { addProject, updateProject, deleteProject, fetchProjects, fetchTasks, setCurrentProject } from '../../redux/actions/main.action';
import { toggleModal, fillModalInfo } from '../../redux/actions/ui.action';
import axios from 'axios';

interface MainProps {
  addProject: (arrProjects: any) => void;
  deleteProject: (arrProjects: any) => void;
  updateProject: (arrProjects: any) => void;
  fetchProjects: (arrProjects: any) => void;
  fetchTasks: (arrTasks: any) => void;
  // setCurrentProjectID: (curProjectID: string) => void;
  fillModalInfo: (modalInfo: any) => void;
  toggleModal: (isOpenModal: boolean) => void;
  setCurrentProject: (currentProject: any) => void;

  loggedUser: any;
  arrProjects: any[];
  arrTasks: any[];
  theme: string;
}

interface ProjectState {
  isOpenNewProject: boolean;
  isHovered: boolean;
  hoveredID: any;
  focus: boolean;
}

class ProjectsComponent extends React.Component<MainProps, ProjectState> {

  constructor(props: any) {

    super(props)
    this.state = {
      isOpenNewProject: false,
      isHovered: false,
      hoveredID: null,
      focus: false,
    }
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
  }

  _onBlur() {

    setTimeout(() => {
      if (this.state.focus) {
        this.setState({
          focus: false,
          isOpenNewProject: false
        });
      }
    }, 0);
  }

  _onFocus() {

    if (!this.state.focus) {
      this.setState({
        focus: true,
        isOpenNewProject: true
      });
    }
  }

  componentDidMount() {

    axios.get("http://localhost:5000/project?user_id=" + this.props.loggedUser.user_id)
      .then(res => {
        let sorted = res.data.sort((a, b) => a.id - b.id)
        // sorted = sorted.sort((a, b) => (a.isdone === b.isdone) ? 0 : a.isdone ? 1 : -1);
        this.props.fetchProjects(sorted)
        
        if (res.data.length > 0) { // project array is not empty
          this.props.setCurrentProject(res.data[0])
          axios.get("http://localhost:5000/task?project_id=" + res.data[0].id)
            .then(res => {
              let sorted = res.data.sort((a, b) => a.id - b.id)
              this.props.fetchTasks(sorted)
            })
        }
      })
  }

  itemClass = (p_id: string) => this.isHovered(p_id) ? "single_item selected" : "single_item"

  handleProjectHover = (flag: boolean, p_id: string) => this.setState({ isHovered: flag, hoveredID: p_id })

  addNew = () => this.setState({ isOpenNewProject: true })

  renderDeleteOption = (p_id: string) => <img src="/images/assets/shared/delete.svg" onClick={() => this.deleteProject(p_id)} alt="" />

  isHovered = (p_id: string) => p_id === this.state.hoveredID && this.state.isHovered

  toggleDone = (project_id: string) => {

    const params = { project_id, user_id: this.props.loggedUser.user_id }

    axios.put("http://localhost:5000/project/updatedone", params)
      .then(res => {
        let sorted = res.data.sort((a, b) => a.id - b.id)
        // sorted = sorted.sort((a, b) => (a.isdone === b.isdone) ? 0 : a.isdone ? 1 : -1);
        this.props.fetchProjects(sorted)
      })
  }

  submitNewProject = (e: any) => {

    if (e.key === "Enter") {
      const d = new Date()
      const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
      const params = { name: e.target.value, user_id: this.props.loggedUser.user_id, date }

      axios.post("http://localhost:5000/project", params)
        .then(res => {
          let sorted = res.data.sort((a, b) => a.id - b.id)
          // sorted = sorted.sort((a, b) => (a.isdone === b.isdone) ? 0 : a.isdone ? 1 : -1);
          this.props.fetchProjects(sorted)
        })

      this.setState({ isOpenNewProject: false })
    }
  }

  renderTodayOrDate = (date: any) => {

    const arrDate = date.split(".")
    const d = new Date()
    let outPut = `${arrDate[0]}.${arrDate[1]}.${arrDate[2]}`

    // console.log(d);
    // console.log(outPut);
    if (d.getDate() == arrDate[0] && d.getMonth() == arrDate[1] - 1 && d.getFullYear() == arrDate[2])
      outPut = "Today"
    //   console.log("TODAY !");

    // if ( d.getDate() === arrDate[0])
    //   console.log("day ok");
    // if ( d.getMonth() === arrDate[1] - 1)
    //   console.log("month ok");

    //   console.log(d.getFullYear() + " | " + arrDate[2]);
    // if ( d.getFullYear() === arrDate[2])
    //   console.log(d.getFullYear() + " | " + arrDate[2]);

    return (outPut)
  }

  renderNewProject = () => {

    return (

      <div className="item_wrapper"  >
        <div className="single_item selected" >
          <div className="custom_checkbox">
            <img src="/images/dark/checkbox_regular.svg" alt="" />
          </div>
          <div className="item_innerContainer">
            <div className="item_info">
              <input type="text" placeholder="Type Project Name" className="new_input" onKeyPress={this.submitNewProject}
                onFocus={this._onFocus} onBlur={this._onBlur} autoFocus />
              <div className="item_date">
                Today
            </div>
            </div>
          </div>
        </div>
        <div className="separator"></div>
      </div>

    )
  }

  deleteProject = (p_id: any) => {

    const index = this.props.arrProjects.findIndex(task => task.id === p_id)

    const modalInfo = {
      title: "Delete \" " + this.props.arrProjects[index].name + "\" ",
      text: "Deleting project will permamently remove from your list",
      leftBtn: "Delete",
      rightBtn: "Cancel",
      function: () => this.callbackDelete(p_id),
    }

    this.props.toggleModal(true)
    this.props.fillModalInfo(modalInfo)
  }

  callbackDelete = (project_id: string) => {

    const params = {
      project_id,
      user_id: this.props.loggedUser.user_id
    }
    axios.delete("http://localhost:5000/project", { data: params })
      .then(res => {
        let sorted = res.data.sort((a, b) => a.id - b.id)
        // sorted = sorted.sort((a, b) => (a.isdone === b.isdone) ? 0 : a.isdone ? 1 : -1);
        this.props.fetchProjects(sorted)
      })
  }

  setCurrentProject = (project: any) => {
    this.props.setCurrentProject(project)
    axios.get("http://localhost:5000/task?project_id=" + project.id)
      .then(res => {
        const sorted = res.data.sort((a, b) => a.id - b.id)
        this.props.fetchTasks(sorted)
      })
  }

  renderItems = () =>
    this.props.arrProjects.map(p =>
      <div className="item_wrapper" key={p.id}>
        <div className={this.itemClass(p.id)} onMouseEnter={() => this.handleProjectHover(true, p.id)} onMouseLeave={() => this.handleProjectHover(false, p.id)}>
          <div className="custom_checkbox" onClick={() => this.toggleDone(p.id)}>
            <img src="/images/dark/checkbox_regular.svg" alt="" />
            {p.isdone ? <img src={"/images/" + this.props.theme + "/check.svg"} className="check" alt="" /> : null}
          </div>
          <div className="item_innerContainer">
            <div className="item_info" onClick={() => this.setCurrentProject(p)}>
              <div className="item_name">
                {p.name}
              </div>
              <div className="item_date">
                {this.isHovered(p.id) ?
                  this.renderDeleteOption(p.id) :
                  this.renderTodayOrDate(p.date)}
              </div>
            </div>
            {p.isdone ? <div className="crossed"></div> : null}
          </div>
        </div>
        <div className="separator"></div>
      </div>
    )


  assignSecondaryTheme = () => this.props.theme === "dark" ? "turquoise" : "dark"

  render() {
    return (
      <div className="projects wrapper container">
        <div className="header header_padding">
          <div className="title">My Projects</div>
          <div className="controls" onClick={this.addNew}>
            <div className={"add_text " + this.assignSecondaryTheme() + "-new"}>
              New Project
              </div>
            <div className="add_btn" >
              <img src={"/images/" + this.props.theme + "/add_new_project.svg"} alt="" />
            </div>
          </div>
        </div>
        <div className="items">
          {this.state.isOpenNewProject && this.renderNewProject()}
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
    addProject: (payload: any) => addProject(dispatch, payload),
    deleteProject: (payload: any) => deleteProject(dispatch, payload),
    updateProject: (payload: any) => updateProject(dispatch, payload),
    fetchProjects: (payload: any) => fetchProjects(dispatch, payload),
    fetchTasks: (payload: any) => fetchTasks(dispatch, payload),
    setCurrentProject: (payload: any) => setCurrentProject(dispatch, payload),

    toggleModal: (payload: any) => toggleModal(dispatch, payload),
    fillModalInfo: (payload: any) => fillModalInfo(dispatch, payload)
  }
}

export default connect(
  mapStateToProps,
  mainActions
)(ProjectsComponent);