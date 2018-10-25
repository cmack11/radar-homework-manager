import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store';
import App from './App';
import rootReducer from './reducers/rootReducer';

const store = configureStore(rootReducer);

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
