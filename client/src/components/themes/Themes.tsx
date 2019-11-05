import React from 'react';
import './Themes.css'
import { connect } from 'react-redux';
import { setTheme, selectTheme } from '../../redux/actions/ui.action'
const arrThemes = require('./themes.json')

interface UiProps {
  setTheme: (theme: string) => void;
  selectTheme: (theme: string) => void;

  selectedTheme: string;
  theme: string;
  secondary_theme: string
}

class Themes extends React.Component<UiProps> {

  addSelected = (theme: any) => theme.name === this.props.selectedTheme ? "selected_theme" : ""

  selectTheme = (theme: any) => this.props.selectTheme(theme["name"])

  rememberTheme = () => this.props.setTheme(this.props.selectedTheme)

  renderThemeOptions = () =>
    arrThemes.map(theme =>
      <div className="theme_option" key={theme.id}>
        <div className={"rectangle " + theme.name + "_theme " + this.addSelected(theme)} onClick={() => this.selectTheme(theme)}></div>
        <div className="rectangle_text">{theme.text}</div>
      </div>
    )

  render() {
    return (
      <div className="container">
        <div className="themes_header">
          <div className="theme_title title">
            Themes
            </div>
          <div className="controls">
            <div className={"cancel_control " + this.props.theme + "-text"}>
              Cancel
            </div>
            <div className={"control " + this.props.theme} onClick={this.rememberTheme}>
              <div className="control_text" >
                Save
              </div>
            </div>
          </div>
        </div>
        <div className="pick_theme_title">
          Pick your theme
        </div>
        <div className="themes">
          {this.renderThemeOptions()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    theme: state.ui.theme,
    selectedTheme: state.ui.selectedTheme
  }
}

const mainActions = (dispatch: any) => {
  return {
    setTheme: (payload: any) => setTheme(dispatch, payload),
    selectTheme: (payload: any) => selectTheme(dispatch, payload)
  }
}

export default connect(
  mapStateToProps,
  mainActions,
)(Themes);
