import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const [itemDetails, setItemDetails] = useState({});
  let params = useParams();

  let getItemDetails = useCallback(async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=6d843156fee8cf6606eff5a68cb6706f`
    );
    setItemDetails(data);
  }, [params]);
  // let getItemDetails = async () => {
  //   let { data } = await axios.get(
  //     `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=6d843156fee8cf6606eff5a68cb6706f`
  //   );
  //   setItemDetails(data);
  // };

  useEffect(() => {
    getItemDetails();
  }, [getItemDetails]);

  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="col-md-3">
          {params.mediaType === "person" ? (
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/original/${itemDetails.profile_path}`}
              alt="Details Img"
            />
          ) : (
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/original/${itemDetails.poster_path}`}
              alt="Details Img"
            />
          )}
        </div>
        <div className="col-md-9">
          <h2>
            {itemDetails.title} {itemDetails.name}
          </h2>
          <p className="text-muted">
            {itemDetails.overview} {itemDetails.biography}
          </p>
        </div>
      </div>
    </>
  );
}
