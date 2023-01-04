import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from "../Home/Home.module.scss";
import { Link, useParams } from "react-router-dom";

export default function SortBy() {
  let params = useParams();
  const sortByType = params.sortByType;
  const [sortedGames, setSortedGames] = useState([]);

  async function getSortedGames(flag) {
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          "sort-by": sortByType,
        },
      }
    );
    if (flag) {
      // Copy of games array
      let sortedGamesCopy = [
        ...sortedGames,
        ...data.slice(sortedGames.length, sortedGames.length + 20),
      ];

      setSortedGames(sortedGamesCopy);
    } else {
      setSortedGames(data.slice(0, 20));
    }
  }
  function moreGames() {
    getSortedGames(true);
  }
  useEffect(() => {
    // console.log("sortByType changed!");
    getSortedGames();
  }, [sortByType]);
  return (
    <>
      <div className="container">
        <div className="row mt-3 gy-4">
          {sortedGames.map((game, index) => (
            <div className="col-md-3" key={index}>
              <Link className="nav-link" to={`/gameDetails/${game.id}`}>
                <div className="game">
                  <div className={`${styles.bgColor} card`}>
                    <img
                      src={game.thumbnail}
                      className="card-img-top"
                      alt="Game"
                    />
                    <div className={`card-body ${styles.bgColor}`}>
                      <div
                        className={`d-flex justify-content-between  rounded-bottom`}
                      >
                        <h4 className="card-title text-muted text-truncate">
                          {game.title}
                        </h4>
                        <button
                          className={`${styles.blueBgColor} btn btn-sm px-1 py-0`}
                        >
                          FREE
                        </button>
                      </div>
                      <p className="text-muted text-truncate w-75">
                        {game.short_description}
                      </p>
                      <div className="gameType d-flex justify-content-between">
                        <div className="gameIcon">
                          <i
                            className={`fas fa-plus-square ${styles.grayColor}`}
                          ></i>
                        </div>
                        <div className="gameGenre">
                          <span
                            className={`${styles.grayIcon} me-2 rounded-pill text-dark`}
                          >
                            {game.genre}
                          </span>
                          {game.platform.includes("Windows") ? (
                            <i className="fab fa-windows text-muted"></i>
                          ) : (
                            <i className="fas fa-window-maximize text-muted"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 mb-5 text-center">
          <button className="btn btn-outline-secondary" onClick={moreGames}>
            More Games <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
