import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import AuthUser from '../services/AuthUser';
import Dashboard from './../components/Dashboard';
const Auth = () => {
    const {token, logout} = AuthUser();
    const logoutUser =() => {
        if(token !== undefined){
            logout();
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <span role='button' className="nav-link" onClick={logoutUser}>Logout</span>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="text" placeholder="Search" />
                            <button className="btn btn-primary" type="button">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
};

export default Auth;