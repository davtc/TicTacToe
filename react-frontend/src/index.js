import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'));
// Using MemoryRouter so that the URL doesn't change when navigating between routes.
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
