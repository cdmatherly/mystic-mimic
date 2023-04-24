import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import LandingPage from './views/LandingPageView';
import Register from './views/RegisterView';
import Login from './views/LoginView';
import Dash from './views/DashView';
import CreateACharacter from './views/CreateACharacterView';
import ShowAllCharacters from './views/ShowAllCharactersView';
import ShowOneCharacter from './views/ShowOneCharacter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LandingPage />} path='/landing' />
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
        <Route element={<Dash />} path='/dash' />
        <Route element={<CreateACharacter />} path='/cac' />
        <Route element={<ShowAllCharacters />} path='/sac' />
        <Route element={<ShowOneCharacter />} path='/soc' />
      </Routes>
    </div>
  );
}

export default App;
