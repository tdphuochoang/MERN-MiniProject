import './App.css';
import React, { useCallback, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import { getProfiles } from './redux/profileSlice';
import { useAppDispatch } from './redux/store';
import AddUser from './pages/AddUser';

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getProfiles())
  }, [dispatch])

  useEffect(() => {
    initApp();
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
   
  );
}

export default App;
