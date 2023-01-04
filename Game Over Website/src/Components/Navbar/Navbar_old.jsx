import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../../images/index.js";
import styles from "./Navbar.module.scss";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Navbar() {
  let [activeElement, setActiveElement] = useState("Home");
  let navigate = useNavigate();
  const options = [
    'one', 'two', 'three'
  ];
  const options2 = [
    'Four', 'Five', 'Six'
  ];
  const defaultOption = options[0];
  const defaultOption2 = options2[0];
  function handleClick(e) {
    // console.log(e.target.text);
    setActiveElement(e.target.text);
  }
  function handleNav() {
    navigate('/games/Platforms/browser')
  }
  return (
    <>
      {/* <nav className={`${styles.navbarStyle} navbar navbar-expand-lg`}>
        <div className="container">
          <Link
            className={`${styles.logoLink} navbar-brand text-light`}
            to="home"
          >
            <img className={styles.logoImg} src={IMAGES.logoImage} alt="Logo" />
            Game Over
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  // className="nav-link active text-light"
                  className={
                    activeElement === "Home"
                      ? "nav-link active text-light"
                      : "nav-link text-muted"
                  }
                  aria-current="page"
                  to="home"
                  onClick={handleClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    activeElement === "All"
                      ? "nav-link active text-light"
                      : "nav-link text-muted"
                  }
                  to="games/all"
                  onClick={handleClick}
                >
                  All
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className={
                    activeElement === "Platforms"
                      ? "nav-link dropdown-toggle text-light"
                      : "nav-link dropdown-toggle text-muted"
                  }
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Platforms
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="games/Platforms/pc">
                      PC
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/Platforms/browser"
                    >
                      Browser
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className={
                    activeElement === "Sort By"
                      ? "nav-link dropdown-toggle text-light"
                      : "nav-link dropdown-toggle text-muted"
                  }
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Sort By
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/sort-by/release-date"
                    >
                      Release Date
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/sort-by/popularity"
                    >
                      Popularity
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/sort-by/alphabetical"
                    >
                      Alphabetical
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/sort-by/relevance"
                    >
                      Relevance
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className={
                    activeElement === "Categories"
                      ? "nav-link dropdown-toggle text-light"
                      : "nav-link dropdown-toggle text-muted"
                  }
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/racing"
                    >
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/sports"
                    >
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/social"
                    >
                      Social
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/shooter"
                    >
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Open World
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Zombie
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Fantasy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Action RPG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Flight
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/relevance"
                    >
                      Battle Royale
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link className="nav-link text-light" to="login">
                Login
              </Link>
              <Link className="btn btn-outline-primary" to="register">
                Join Free
              </Link>
              <Link className="btn btn-outline-primary">Log Out</Link>
            </ul>
          </div>
        </div>
      </nav> */}
      <Dropdown options={options} onChange={handleNav} value={defaultOption} placeholder="Select an option" />;
      <Dropdown options={options2} value={defaultOption2} placeholder="Select an option" />;
    </>
  );
}
