import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
// import { combineReducers } from '@reduxjs/toolkit';
import {combineReducers, createStore } from 'redux';
import { TestReducer } from './States/Reducers/testReducer';
import { CartReducer } from "./States/Reducers/CartReducer";
import { customerLogedInReducer } from "./States/Reducers/CustomerLogedInReducer";

const rootReducer = combineReducers({testState: TestReducer,cartItem: CartReducer,customerLogedIn: customerLogedInReducer})
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
