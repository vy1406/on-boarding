import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../login/LoginPage';
import LayoutPage from '../layout/LayoutPage';

// ---------------------------------------
// This component made for rendering main app or login page.
// ---------------------------------------

interface MainAppProps {

  isAuthenticated: boolean;
}

class MainApp extends React.Component<MainAppProps>  {

  render = () =>  this.props.isAuthenticated ? <LayoutPage /> : <LoginPage />
}


const mapStateToProps = (state: any) => {

  return {
    isAuthenticated: state.ui.isAuthenticated,
  }
}


export default connect(
  mapStateToProps,
)(MainApp);

