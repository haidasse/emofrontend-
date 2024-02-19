import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/admin.css';
import Utilisateurs from './Utilisateurs'; // Assuming Utilisateurs is Users in English

function Admin() {
  // Use the navigation hook
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  
  // Get user information from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to home if user is not logged in or not an admin
  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <>
      {/* Navigation bar */}
      <nav>
        <div className="logo-name">
          <div className="logo-image">
            <img
              src="/logoSER.png"
              alt="Logo"
              style={{
                width: '130px',
                height: '130px',
                position: 'relative',
                left: '40px',
                bottom: '10px',
              }}
            />
          </div>
        </div>

        {/* Menu items */}
        <div className="menu-items">
          {/* Navigation links */}
          <ul className="nav-links">
            <li>
              <a href="/admin">
                <i className="uil uil-estate"></i>
                <span className="link-name">Home</span>
              </a>
            </li>
            <li>
              <a href="/historique">
              <i className="uil uil-history"></i>
                <span className="link-name">audio history</span>
              </a>
            </li>
          </ul>

          {/* Logout button */}
          <ul className="logout-mode">
            <li>
              <a href="#">
                <i className="uil uil-signout"></i>
                <span className="link-name" onClick={handleLogout}>
                  <i className="bx bx-log-in-circle"></i>
                  <span className="links_name">Logout</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Content area, displaying Users component */}
      <div className="content">
        <Utilisateurs />
      </div>
    </>
  );
}

export default Admin;
