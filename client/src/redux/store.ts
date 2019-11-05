import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const middlewares = [thunk]

export const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;