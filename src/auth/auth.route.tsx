// AuthRoute.tsx
import { Navigate } from 'react-router-dom';
import HomeComponent from '../Home/home';
import authProvider from '../provider/auth-provider';

function AuthRoute(props: any) {
  if (!authProvider.isAuthenticated()) {
    return  <Navigate to="/login" />;
  }
  // Component
  return <HomeComponent  />;
}

export default AuthRoute;