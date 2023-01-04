import React, { Component } from 'react'
import styles from "./About.module.css";
export default class About extends Component {
  render() {
    return (
      <>
        <div className={`${styles.about} text-center}`}>
          <div className={styles.header}>
            <h2 className={styles.title}>ABOUT</h2>
            <div className="dividerLine d-flex justify-content-center align-items-center">
              <div className="dividerAbout"></div>
              <i className="fa-solid fa-star fa-2x divider2About"></i>
              <div className="dividerAbout"></div>
            </div>
            <div className="container">
            <div className="row">
              <div className="col-md-3 offset-md-3">
                <div className={styles.cell}>
                <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
              </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.cell} w-75`}>
                  {/* mx-5 w-50 */}
                <p>You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!</p>
              </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
