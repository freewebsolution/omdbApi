import React from 'react';
import AuthUser from '../services/AuthUser';

const Dashboard = () => {
    const {user} = AuthUser();
    return (
        <div>
            HELLO <small><b>{user.name}</b> your email is <b>{user.email}</b></small>
        </div>
    );
};

export default Dashboard;