import React from 'react';
import './App.css';
import Routes from './config/router';
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch
} from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        {/* <div className="sidebar"> */}
        {/* </div> */}
        {/* <div className="content"> */}
        <Routes>

        </Routes>
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
