import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MediaContext } from "../Context/MediaContext";

export default function Tvshows({ itemsNumber }) {
  let { trendingTvs } = useContext(MediaContext);
  return (
    <>
      <div className="row py-4 gy-1">
        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25"></div>
            <h3 className="mt-4">Trending</h3>
            <h3>TVs Shows</h3>
            <h3 className="mb-4">To Watch Now</h3>
            <span className="text-muted">Most Watched TVShows by days</span>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
        {trendingTvs.slice(0, itemsNumber).map((item, index) => (
          <div key={index} className="col-md-2">
            <Link
              to={`/details/${item.id}/${item.media_type}`}
              className="nav-link"
            >
              <div className="item position-relative">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt="TV Img"
                />
                <h2 className="h6 text-center my-3">{item.name}</h2>
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
