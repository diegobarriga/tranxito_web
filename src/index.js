import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import store from './store/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
