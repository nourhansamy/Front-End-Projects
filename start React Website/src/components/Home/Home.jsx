import React, { Component } from 'react'
import styles from './Home.module.css';
export default class Home extends Component {
  render() {
    return (
      <>
      <div className={styles.homePage}>
        <img className ="w-100" src="https://routeegypt.com/start-react/assets/img/avataaars.svg" alt="" />
        <h1>START REACT</h1>
        <div className=" dividerLine d-flex justify-content-center align-items-center">
        <div className="divider"></div>
        <i className="fa-solid fa-star fa-2x text-white"></i>
        <div className="divider"></div>
        </div>
        <p className={styles.homeParagraph}>Graphic Artist - Web Designer - Illustrator</p>
      </div>
      </>
    )
  }
}
