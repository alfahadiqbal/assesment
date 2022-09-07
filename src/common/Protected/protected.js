
import React from 'react'
import { Redirect } from 'react-router-dom'

function ProtectedRoute(props) {

        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('isLoggedIn');
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    
}

export default ProtectedRoute;