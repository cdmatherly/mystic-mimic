import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </div>
  );
}

export default App;
