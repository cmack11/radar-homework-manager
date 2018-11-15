import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store';
import App from './App';
import rootReducer from './reducers/rootReducer';

import {BrowserRouter} from 'react-router-dom';

const store = configureStore(rootReducer);

export default class Main extends Component {
  render() {
    return (

    );
  }
}
