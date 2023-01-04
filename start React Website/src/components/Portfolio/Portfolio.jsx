import React, { Component } from "react";
import styles from "./Portfolio.module.css";
import IMAGES from "../../images/index.js";
export default class Portfolio extends Component {
  render() {
    return (
      <>
        <div className="container text-center">
          <div className={styles.header}>
            <h2>PORTFOLIO</h2>
            <div className="dividerLine d-flex justify-content-center align-items-center">
              <div className="divider2"></div>
              <i className="fa-solid fa-star fa-2x divider2Icon"></i>
              <div className="divider2"></div>
            </div>

            <div className="row g-5">
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.cabinImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.cakeImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.circusImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.gameImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.safeImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item">
                  <img className="w-100" src={IMAGES.submarineImage} alt="" />
                  <div className="caption d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-plus fa-5x text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
