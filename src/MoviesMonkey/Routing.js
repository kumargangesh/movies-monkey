import React from 'react';
import { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import FrontPage from './FrontPage';
import SingleMovieInfo from './SingleMovieInfo';

function Routing() {

  const [movieID, setMovieID] = useState("");

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage compName="FrontPage" ID={movieID} setID={setMovieID} />} />
            <Route path="/moviesearch" element={<SingleMovieInfo compName="SingleMovieInfo" movieID={movieID} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing;
