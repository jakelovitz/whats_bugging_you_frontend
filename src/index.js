import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

// ReactDOM.render(<App />, document.getElementById('root'));
const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <Route path="/" render={(routerProps) => <App {...routerProps}/>} />
    </Router></Provider>, document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
