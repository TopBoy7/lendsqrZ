// import { useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
    
      <div>
        <div className="routes">
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />x
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        
      </div>

    </BrowserRouter>
  )
}

export default App
