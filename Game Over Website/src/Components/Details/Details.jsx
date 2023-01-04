import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.module.scss";

export default function Details() {
  let params = useParams();
  const gameId = params.gameId;
  const [gameDetails, setGameDetails] = useState({});
  const [screenshots, setScreenshots] = useState([
  ]);

  async function getGameDetails() {
    // console.log("getGameDetails");
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/game",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          id: gameId,
        },
      }
    );
    setGameDetails(data);
    setScreenshots(data.screenshots);
  }
  useEffect(() => {
    // console.log("Number useEffect");
    getGameDetails();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="gameImage">
              <img
                src={gameDetails.thumbnail}
                className="rounded w-100"
                alt=""
              />
            </div>
            <div className="mt-3">
              <button
                className={`btn ${styles.grayBgColor} ${styles.grayColor}`}
              >
                FREE
              </button>
              <a
                className={`btn w-75 ms-3 ${styles.blueColor} text-white font-weight-bold`}
                href={gameDetails.freetogame_profile_url}
                target="_blank"
              >
                PLAY NOW <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
          <div className="col-md-8">
            <div className="game-details">
              <h1 className={`${styles.grayColor}`}>{gameDetails.title}</h1>
              <h5 className={`${styles.grayColor}`}>
                About {gameDetails.title}
              </h5>
              <p className={`${styles.grayColor}`}>{gameDetails.description}</p>
              <h5 className={`${styles.grayColor}`}>
                Minimum System Requirements
              </h5>
              {gameDetails.minimum_system_requirements ? (
                <div className="requirements ps-2">
                  <h6 className={`${styles.grayColor}`}>
                    <span className="fw-bolder">Graphics: </span>
                    {gameDetails.minimum_system_requirements.graphics}
                  </h6>
                  <h6 className={`${styles.grayColor}`}>
                    <span className="fw-bolder">Memory: </span>
                    {gameDetails.minimum_system_requirements.memory}
                  </h6>
                  <h6 className={`${styles.grayColor}`}>
                    <span className="fw-bolder">OS: </span>
                    {gameDetails.minimum_system_requirements.os}
                  </h6>
                  <h6 className={`${styles.grayColor}`}>
                    <span className="fw-bolder">Processor: </span>
                    {gameDetails.minimum_system_requirements.processor}
                  </h6>
                  <h6 className={`${styles.grayColor}`}>
                    <span className="fw-bolder">Storage: </span>
                    {gameDetails.minimum_system_requirements.storage}
                  </h6>
                </div>
              ) : (
                ""
              )}
              <h4 className={`${styles.grayColor} mb-3 mt-3`}>
                {gameDetails.title} Screenshots
              </h4>
              <div
                id="carouselExampleSlidesOnly"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {screenshots.map((item, index) => {
                    if (index === 0) {
                      return (
                        <div
                          className="carousel-item active"
                          data-bs-interval="500"
                          key={index}
                        >
                          <img
                            className="d-block w-100"
                            src={item.image}
                            alt={`Slide ${index + 1} `}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="carousel-item"
                          data-bs-interval="500"
                          key={index}
                        >
                          <img
                            className="d-block w-100"
                            src={item.image}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {/* {gameDetails.screenshots ?
                <div className="screenshots mt-3 mb-3">
                  <h4 className={`${styles.grayColor} mb-3`}>
                    {gameDetails.title} Screenshots
                  </h4>
                  <div
                    id="carouselExampleSlidesOnly"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {gameDetails.screenshots.map((item, index) => {
                        if (index === 0) {
                          return (
                            <div
                              className="carousel-item active"
                              data-bs-interval="1000"
                              key={index}
                            >
                              <img
                                className="d-block w-100"
                                src={item.image}
                                alt={`Slide ${index + 1} `}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="carousel-item"
                              data-bs-interval="1000"
                              key={index}
                            >
                              <img
                                className="d-block w-100"
                                src={item.image}
                                alt={`Slide ${index + 1}`}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                : ''} */}

              <h2 className={`${styles.grayColor} mb-4 mt-3`}>
                Additional Information
              </h2>
              <div className="row d-flex justify-content-between additional-info">
                <div className="col-md-4">
                  <h6 className="text-muted">Title</h6>
                  <p className={`${styles.grayColor}`}>{gameDetails.title}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Developer</h6>
                  <p className={`${styles.grayColor}`}>{gameDetails.title}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Publisher</h6>
                  <p className={`${styles.grayColor}`}>
                    {gameDetails.publisher}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Release Date</h6>
                  <p className={`${styles.grayColor}`}>
                    {gameDetails.release_date}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Genre</h6>
                  <p className={`${styles.grayColor}`}>{gameDetails.genre}</p>
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Platform</h6>
                  <p className={`${styles.grayColor}`}>
                    {gameDetails.platform}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
