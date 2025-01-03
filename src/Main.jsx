import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';


function Main({ isLoggedIn, handleLogin, handleLogout, user }) {
  return (
    <div className='main'>
        <Routes>
            <Route path='/' element={<Home user={ user } />} />
            <Route path='/profile/*' element={<Profile isLoggedIn={ isLoggedIn } handleLogin={ handleLogin } handleLogout={ handleLogout } user={ user }/>} />
        </Routes> 
    </div>
  );
}

export default Main;