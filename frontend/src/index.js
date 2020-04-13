import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Router>
    <div>
      <Route  path="/" exact = {true} component={App} />
      <Route path='/home' exact ={false} component={Home} />
    </div>
  </Router>);

ReactDOM.render(routing, document.getElementById('root'));