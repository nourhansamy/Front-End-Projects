import React, { Component } from "react";
import styles from "./Footer.module.css";
export default class Footer extends Component {
  render() {
    return (
      <>
        <div>
          <div className={`${styles.footerColor} row text-center text-white`}>
            <div className="col-md-4">
              <h4>LOCATION</h4>
              <p className={styles.footerParagraph}>2215 John Daniel Drive Clark, MO 65243</p>
            </div>
            <div className="col-md-4">
              <h4>AROUND THE WEB</h4>
              <a href="#">
                <i className="fa-brands fa-facebook-f btn btn-outline-light rounded-circle p-3 mx-2"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter btn btn-outline-light rounded-circle p-3 mx-2"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin-in btn btn-outline-light rounded-circle p-3 mx-2"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-dribbble btn btn-outline-light rounded-circle p-3 mx-2"></i>
              </a>
            </div>
            <div className="col-md-4">
              <h4>ABOUT FREELANCER</h4>
              <p className={styles.footerParagraph}>
                Freelance is a free to use, MIT licensed Bootstrap theme created
                by Route
              </p>
            </div>
          </div>
          <div
            className={`${styles.footerDarkColor} text-white text-center py-4`}
          >
            Copyright © Your Website 2021
          </div>
        </div>
      </>
    );
  }
}
