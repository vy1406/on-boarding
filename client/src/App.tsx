import React from 'react';
import './App.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import MainApp from './components/mainApp/MainApp';

const App: React.FC = () => {
  return (

     <Provider store={store}>
       <MainApp /> 
     </Provider>

  );
}


export default App;
