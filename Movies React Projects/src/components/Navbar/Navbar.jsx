import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
export default function Navbar({ userData, logout }) {
  let navigate = useNavigate();
  function logoutFunc() {
    logout();
    navigate("/login");
  }
  return (
    <nav className={`${styles.bgNavbar} navbar navbar-expand-lg`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="">
          Noxe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tvshows">
                  Tvshows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="people">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <div className="social-media d-flex align-items-center">
              <i className="fab fa-facebook mx-2"></i>
              <i className="fab fa-spotify mx-2"></i>
              <i className="fab fa-instagram mx-2"></i>
              <i className="fab fa-youtube mx-2"></i>
            </div>
            {userData ? (
              <li className="nav-item">
                <div className="d-flex align-items-center">
                  <Link className="nav-link" to="profile">
                    <span>Hello</span>
                    <span>{userData.first_name}</span>
                  </Link>

                  <Link className="nav-link" onClick={logoutFunc} to="">
                    Logout
                  </Link>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-info" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
