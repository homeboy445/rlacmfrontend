import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Mainer from './Mainer';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Mainer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();