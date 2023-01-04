import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { MediaContext } from "../Context/MediaContext";

export default function Movies({ itemsNumber }) {
  const { trendingMovies } = useContext(MediaContext);
  const [itemDetails, setItemDetails] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let setDetails = async (item) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${item}?api_key=6d843156fee8cf6606eff5a68cb6706f`
    );
    setItemDetails(data);
    console.log(data);
    console.log("itemDetails:", itemDetails);
    handleShow();
  };

  return (
    <>
      {itemDetails ? (
        <div>
          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title className="text-black">
                {itemDetails.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-black">
              <div className="row">
                <div className="col-md-6">
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original/${itemDetails.poster_path}`}
                    alt="Details Img"
                  />
                </div>
                <div className="col-md-6">
                  <h2>
                    {itemDetails.title} {itemDetails.name}
                  </h2>
                  <p className="text-muted">
                    {itemDetails.overview} {itemDetails.biography}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ""
      )}
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
              onClick={() => setDetails(item.id)}
              // to={`/details/${item.id}/${item.media_type}`}
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
