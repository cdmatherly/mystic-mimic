import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './views/RegisterView';
import Login from './views/LoginView';
import Dash from './views/DashView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
        <Route element={<Dash />} path='/dash' />
      </Routes>
    </div>
  );
}

export default App;
