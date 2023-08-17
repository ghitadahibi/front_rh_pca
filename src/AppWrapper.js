import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';
import KecloakLoginPage from './components/KecloakLoginPage';
import Dashboard from './components/Dashboard';
import CrudDemo from './pages/CrudDemo';
const AppWrapper = (props) => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
 
       
       

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/access" element={<Access />} />
            <Route path="/" element={<KecloakLoginPage />} />
            <Route path="/dash" element={<App />} />
            <Route path="/crud" element={<CrudDemo />} />
        </Routes>
    );
};

export default AppWrapper;
