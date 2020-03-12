import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import DistributedRouter from './components/DistributedRouter'

function App() {
  return (
    <div>
      <Router>
          <Route path="/" exact component={DistributedRouter}/>
      </Router>
    </div>
  );
}

export default App;
