import LoginComponent from './Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './auth/auth.route';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/home" element={<AuthRoute />} />
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;