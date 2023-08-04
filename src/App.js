import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import Home from './components/home.component'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>
            <img src={require('./images/animalsense-logo512x512.png')} alt="AnimalSense Logo"  style={{ width: '50px', height: 'auto' }}/>&nbsp;
              AnimalSense
            </Link>
            <Link className="nav-link" to={'/sign-in'}>
                    Login
            </Link>
            <Link className="nav-link" to={'/sign-up'} >
                    Sign up
            </Link>
            
                  
                
          </div>
        </nav>
        <div className="content-wrapper">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
