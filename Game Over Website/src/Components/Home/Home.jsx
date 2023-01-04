import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  const [popularGames, setPopularGames] = useState([]);
  async function getPopularGames() {
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    // console.log(data.slice(0, 3));
    setPopularGames(data.slice(0, 3));
  }
  useEffect(() => {
    getPopularGames();
  }, []);

  return (
    <>
      <div className={`${styles.gameHome} text-center`}>
        <h1>
          Find & track the best{" "}
          <span className={styles.blueColor}>free-to-play</span> games!
        </h1>
        <p className={styles.grayColor}>
          Track what you've played and search for what to play next! Plus get
          free premium loot!
        </p>
        <Link className="btn btn-outline-secondary" to="/games/all">
          Browse Games
        </Link>
      </div>
      <div className="container mt-5">
        <h3 className={styles.grayColor}>
          <i className="fas fa-robot mr-2"></i>
          Personalized Recommendations
        </h3>
        <div className="row mt-3 g-3">
          {popularGames.map((game, index) => (
            <div className="col-md-4" key={index}>
              <Link className="nav-link" to={`/gameDetails/${game.id}`}>
                <div className="game">
                  <div className={`${styles.bgColor} card`}>
                    <img
                      src={game.thumbnail}
                      className="card-img-top"
                      alt="Game"
                    />
                    <div
                      className={`card-body d-flex justify-content-between ${styles.bgColor} rounded-bottom`}
                    >
                      <h4 className="card-title text-muted">{game.title}</h4>
                      <button className={`${styles.blueBgColor} btn btn-sm px-1 py-0`}>
                        FREE
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
