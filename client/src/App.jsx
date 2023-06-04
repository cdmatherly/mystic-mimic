import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import ShowOneCampaignModal from "./components/ShowOneCampaignModal"
import NotFound from "./views/NotFound";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
  const user = cookies.user_id

  return (
    <CookiesProvider>
      <Routes>
        <Route element={<Index />} path='/' >
          <Route element={<ProtectedRoute user={user} />}>
            <Route element={<CreateACharacter />} path="/characters/new" />
            <Route element={<ShowAllCharacters />} path='/characters' />
            <Route element={<ShowOneCharacter />} path='/characters/:char_id' />
            <Route element={<CreateACampaign />} path='/campaigns/new' />
            <Route element={<ViewAllCampaigns/>} path='/campaigns' />
          </Route>
          <Route element={<NotFound/>} path='/*' />
        </Route>
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
