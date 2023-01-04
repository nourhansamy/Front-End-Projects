import React, { Component } from "react";
import styles from "./Contact.module.css";
export default class Contact extends Component {
  render() {
    return (
      <>
        <div className="container text-center">
          <div className={styles.header}>
            <h2>CONTACT ME</h2>
            <div className="dividerLine d-flex justify-content-center align-items-center">
              <div className="divider2"></div>
              <i className="fa-solid fa-star fa-2x divider2Icon"></i>
              <div className="divider2"></div>
            </div>
            <div className="col-md-6 mx-auto">
              <form action="">
                <div className="mb-3 mt-5">
                  <input
                    type="text"
                    className={`${styles.inputStyle} form-control`}
                    id="name"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`${styles.inputStyle} form-control`}
                    id="email"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`${styles.inputStyle} form-control`}
                    id="phone"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className={`${styles.inputStyle} form-control`}
                    id="exampleFormControlTextarea1"
                    rows={6}
                    defaultValue={""}
                    placeholder="Message"
                  />
                </div>
                <div className="text-start">
                <button className={`${styles.buttonStyle} btn`}>Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
