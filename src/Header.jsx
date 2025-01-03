import React from 'react';
import Footer from './Footer';
import { Link, useLocation } from 'react-router-dom';

function Header() {

    let location = useLocation()

    return (
        <header>
            <div>
                <h1>To Do</h1>
            </div>
            <div className="link-container">
                <Link to='/' className={`link ${location.pathname === '/' ? 'active' : ''}`}><h2>Home</h2></Link>
                <Link to='/profile' className={`link ${location.pathname === '/profile' ? 'active' : ''}`}><h2>Profile</h2></Link>
            </div>
            <Footer />
        </header>
    );
}

export default Header;