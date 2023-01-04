import React, { useContext } from "react";

import { Link } from "react-router-dom";
import IMAGES from "../../images/index.js";
import { MediaContext } from "../Context/MediaContext";

export default function People({ itemsNumber }) {
  let { trendingPeople } = useContext(MediaContext);
  return (
    <>
      <div className="row py-4 gy-1">
        <div className="col-md-4">
          <div className="welcome">
            <div className="brdr w-25"></div>
            <h3 className="mt-4">Trending</h3>
            <h3>People</h3>
            <h3 className="mb-4">To Watch Now</h3>
            <span className="text-muted">Most Watched People by days</span>
            <div className="brdr w-100 mt-4"></div>
          </div>
        </div>
        {trendingPeople.slice(0, itemsNumber).map((item, index) => (
          <div key={index} className="col-md-2">
            <Link
              to={`/details/${item.id}/${item.media_type}`}
              className="nav-link"
            >
              <div className="item position-relative">
                {item.profile_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                    alt="Person Img"
                  />
                ) : (
                  <img
                    className="w-100"
                    src={IMAGES.emptyImage}
                    alt="Person Img"
                  />
                )}
                <h2 className="h6 text-center my-3">{item.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
