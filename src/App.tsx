import React from 'react';
import HomeComponent from './Home/home';
import LoginComponent from './Login/login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import authProvider from './provider/auth-provider';
import ProtectedRoute from './common/Protected/protected';


function App() {
  console.log(authProvider.isAuthenticated() ,' k')
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />  
          <Route path="/home" element={ <HomeComponent />} />
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
