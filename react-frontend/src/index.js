import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
// Using MemoryRouter so that the URL doesn't change when navigating between routes.
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
