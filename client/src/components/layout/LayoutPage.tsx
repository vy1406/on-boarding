import React from 'react';
import './LayoutPage.css';
import AboutPage from '../about/AboutPage';
import Themes from '../themes/Themes';
import Modal from '../modal/Modal';
import HomePage from '../home/HomePage';
import { connect } from 'react-redux';
import { changeView, toggleModal, setCurrentMenuButton, setIsAuthenticated, setLoggedUser } from '../../redux/actions/ui.action';
import { PATHS } from '../../redux/constants'

const arrButtons = require("./arrMenuButtons.json")

interface UiProps {
  changeView: (path: string) => void;
  toggleModal: (isModalOpen: boolean) => void;
  setCurrentMenuButton: (currentSelectedMenuBtn: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoggedUser: (loggedUser: any) => void;

  loggedUser: any;
  currentSelectedMenuBtn: string;
  path: string;
  isModalOpen: boolean;
  theme: string;
}


class LayoutPage extends React.Component<UiProps> {

  changePath = (path: string) => this.props.changeView(path);

  renderMenuButtons = () => arrButtons.map(btn => this.renderIconAndLabelDiv(btn.divClass, btn.text, btn.picName, btn.path, btn.id))

  renderIconAndLabelDiv = (divClass: string, itemText: string, picName: string, iconPath: string, id: number) => {

    const path = this.props.currentSelectedMenuBtn === iconPath ? this.props.theme + "/" + picName + "_selected.svg" : "assets/shared/side_menu/" + picName + ".svg"
    return (
      <div key={id} className={divClass} onClick={() => this.changePath(iconPath)}>
        <img src={"images/" + path} alt="" />
        <label>{itemText}</label>
      </div>
    )
  }

  logout = () => {
    this.props.setIsAuthenticated(false)
    this.props.setLoggedUser(null)
  }

  renderLogoutButton = () => {

    return (
      <div key="5" className="btn end" onClick={this.logout}>
        <img src="images/assets/shared/side_menu/logout.svg" alt="" />
        <label>Logout</label>
      </div>
    )
  }

  renderCurrentView = () => {
    const { ABOUT, HOME, SETTINGS, LOGOUT } = PATHS;
    switch (this.props.path) {

      case ABOUT:
        this.props.setCurrentMenuButton(ABOUT)
        return <AboutPage />

      case SETTINGS:
        this.props.setCurrentMenuButton(SETTINGS)
        return <Themes />

      default:
        this.props.setCurrentMenuButton(HOME)
        return <HomePage />;
    }
  }

  render() {
    return (
      <div className="layout">
        <div className="sidebar">
          <div className="btn-group">
            {this.renderMenuButtons()}
          </div>
          {/* {this.renderIconAndLabelDiv("btn end", "Logout", "logout", "LOGOUT", 5)} */}
          {this.renderLogoutButton()}
        </div>
        <div className="bodyContent">
          <div className="header layout_header">
            <div className="logo">
              <div className="projectory">
                <img src={"/images/" + this.props.theme + "/logo.svg"} alt="" />
              </div>
            </div>
            <label className="logged_user">{this.props.loggedUser.username}</label>
          </div>
          <div className="innerContent">
            {this.renderCurrentView()}
          </div>
        </div>
        {this.props.isModalOpen && <Modal />}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    path: state.ui.path,
    isModalOpen: state.ui.isModalOpen,
    theme: state.ui.theme,
    currentSelectedMenuBtn: state.ui.currentSelectedMenuBtn,
    loggedUser: state.ui.loggedUser
  }
}

const uiActions = (dispatch: any) => {
  return {
    changeView: (payload: any) => changeView(dispatch, payload),
    toggleModal: (payload: any) => toggleModal(dispatch, payload),
    setCurrentMenuButton: (payload: any) => setCurrentMenuButton(dispatch, payload),
    setIsAuthenticated: (payload: any) => setIsAuthenticated(dispatch, payload),
    setLoggedUser: (payload: any) => setLoggedUser(dispatch, payload)
  }
}

export default connect(
  mapStateToProps,
  uiActions
)(LayoutPage);