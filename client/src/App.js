import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './views/Register'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Register />} path='/register' />
      </Routes>
    </div>
  );
}

export default App;
