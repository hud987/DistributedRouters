import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ImageEditor from './components/ImageEditor'

function App() {
  return (
    <div>
      <Router>
          <Route path="/" exact component={ImageEditor}/>
      </Router>
    </div>
  );
}

export default App;
