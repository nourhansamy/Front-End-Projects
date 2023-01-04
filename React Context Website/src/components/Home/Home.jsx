import React from "react";
import TVshows from '../TVshows/TVshows';
import Movies from '../Movies/Movies';
import People from '../People/People';
export default function Home() {
let itemsNumber = 10;
  return (
    <>
      <Movies itemsNumber={itemsNumber}/>
      <TVshows itemsNumber={itemsNumber}/>
      <People itemsNumber={itemsNumber}/>
    </>
  );
}
