import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Movies({ itemsNumber }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  let getTrendingMovies = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=6d843156fee8cf6606eff5a68cb6706f"
    );
    setTrendingMovies(data.results);
  };
  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
      <div className="row py-4 gy-1">
        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25"></div>
            <h3 className="mt-4">Trending</h3>
            <h3>Movies</h3>
            <h3 className="mb-4">To Watch Now</h3>
            <span className="text-muted">Most Watched Movies by days</span>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
        {trendingMovies.slice(0, itemsNumber).map((item, index) => (
          <div key={index} className="col-md-2">
            <Link
              to={`/details/${item.id}/${item.media_type}`}
              className="nav-link"
            >
              <div className="item position-relative">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt="Movie Img"
                />
                <h2 className="h6 text-center my-3">{item.title}</h2>
                <span className="bg-info position-absolute end-0 top-0 p-2">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
