import "./App.css";
import React, { useContext, useState } from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import LandingPage from './views/LandingPageView';
import Register from "./views/RegisterView";
import Login from "./views/LoginView";
import Dash from "./views/DashView";
import CreateACharacter from "./views/CreateACharacterView";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from './context/AuthProvider'
import { CookiesProvider, useCookies } from "react-cookie";
import ShowAllCharacters from './views/ShowAllCharactersView';
import ShowOneCharacter from './views/ShowOneCharacter';
import Index from './components/Index'
import CreateACampaign from "./views/CreateACampaign";
import ViewAllCampaigns from "./views/ShowAllCampaigns";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
  // const user = cookies.user_id
  const user = false

  return (
    <CookiesProvider>
      <Routes>
        <Route element={<Index />} path='/' >
          <Route element={<ProtectedRoute user={user} />}>
            <Route element={<CreateACharacter />} path="/cac" />
            <Route element={<ShowAllCharacters />} path='/sac' />
            <Route element={<ShowOneCharacter />} path='/soc' />
            <Route element={<CreateACampaign />} path='/cag' />
            <Route element={<ViewAllCampaigns />} path='/vac' />
          </Route>
        </Route>
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
