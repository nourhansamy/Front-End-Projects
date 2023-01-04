import React, { useState } from "react";
import { Link } from "react-router-dom";
import IMAGES from "../../images/index.js";
import styles from "./Navbar.module.scss";

export default function Navbar({ userData, logOut }) {
  let [activeElement, setActiveElement] = useState("Home");
  function handleClick(e) {
    // console.log(e.target.innerText);
    setActiveElement(e.target.text);
  }
  return (
    <>
      <nav className={`${styles.navbarStyle} navbar navbar-expand-lg`}>
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
                <button
                  className={
                    activeElement === "Platforms"
                      ? "nav-link dropdown-toggle text-light dropdown-item"
                      : "nav-link dropdown-toggle text-muted dropdown-item"
                  }
                  // role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="inside outside"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Platforms
                </button>
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
                <button
                  className={
                    activeElement === "Sort By"
                      ? "nav-link dropdown-toggle dropdown-item text-light"
                      : "nav-link dropdown-toggle dropdown-item text-muted"
                  }
                  // role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="inside outside"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Sort By
                </button>
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
                <button
                  className={
                    activeElement === "Categories"
                      ? "nav-link dropdown-toggle dropdown-item text-light"
                      : "nav-link dropdown-toggle dropdown-item text-muted"
                  }
                  // role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="inside outside"
                  aria-expanded="false"
                  onClick={handleClick}
                >
                  Categories
                </button>
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
                      to="games/categories/open-world"
                    >
                      Open World
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/zombie"
                    >
                      Zombie
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/fantasy"
                    >
                      Fantasy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/action-rpg"
                    >
                      Action RPG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/action"
                    >
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/flight"
                    >
                      Flight
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="games/categories/battle-royale"
                    >
                      Battle Royale
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData ? (
                <li className="nav-item">
                  <Link className={`btn ${styles.blueColor}`} onClick={logOut}>Log Out</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-muted" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`btn ${styles.blueColor}`} to="register">
                      Join Free
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
