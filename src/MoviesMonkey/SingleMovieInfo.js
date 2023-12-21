import React from 'react';
import "./Style.css";
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from './Spinner';
import SingleMovieReloadError from './SingleMovieReloadError';

function SingleMovieInfo(props) {

  const errorMessage = "Sorry, unable to load the movie please go back and try again";
  const [loaderStatus, toggleLoaderStatus] = useState(true);
  const [switchValue, changeSwitch] = useState(false);
  const [isMovieLoaded, toggleIsMovieLoaded] = useState(false);
  // const [isButtonClicked, toggleButtonClicked] = useState(false);
  // const [buttonState, toggleButtonState] = useState("LOAD MOVIE");
  const [loadedMovieName, setLoadedMovieName] = useState("");
  const [loadedMoviePoster, setLoadedMoviePoster] = useState("");
  const [loadedMovieYear, setLoadedMovieYear] = useState("");
  const [loadedMovieActors, setLoadedMovieActors] = useState("");
  const [loadedMovieGenre, setLoadedMovieGenre] = useState("");
  const [loadedMoviePlot, setLoadedMoviePlot] = useState("");
  const [movieDivBK, toggleMovieDivBK] = useState({
    backgroundColor: "#BFA181",
    color: "rgb(12, 25, 37)"
  });
  const [errorMessageDiv, changeErrorMessageDiv] = useState({
    fontWeight: "bolder",
    border: "0px",
    marginTop: "15%",
    color: "#BFA181"
  });
  const [loaderStyle, changeLoaderStyle] = useState({color : "white"});

  const toggleSwitch = () => {
    if (switchValue === true) {
      document.body.style.backgroundColor = "rgb(12, 25, 37)";
      toggleMovieDivBK({
        backgroundColor: "#BFA181",
        color: "rgb(12, 25, 37)"
      });
      changeErrorMessageDiv({
        fontWeight: "bolder",
        border: "0px",
        marginTop: "15%",
        color: "#BFA181"
      });
      changeLoaderStyle({color : "white"});
      changeSwitch(false);
    } else if (switchValue === false) {
      document.body.style.backgroundColor = "#F0FFFA";
      toggleMovieDivBK({
        backgroundColor: "rgb(12, 25, 37)",
        color: "#BFA181"
      });
      changeErrorMessageDiv({
        fontWeight: "bolder",
        border: "0px",
        marginTop: "15%",
        color: "black"
      });
      changeLoaderStyle({color : "black"});
      changeSwitch(true);
    }
  }

  useEffect(() => {
    const getMovieInfo = async () => {
      if (props.movieID !== "") {
        console.log("in singlemovieinfo ID : " + props.movieID);
        const movieData = await fetch("https://www.omdbapi.com/?i=" + props.movieID + "&apikey=5f315efc");
        console.log(movieData);
        const parsedData = await movieData.json();
        console.log(parsedData);
        setLoadedMovieName(parsedData.Title);
        setLoadedMoviePoster(parsedData.Poster);
        setLoadedMovieYear(parsedData.Released);
        setLoadedMovieActors(parsedData.Actors);
        setLoadedMovieGenre(parsedData.Genre);
        setLoadedMoviePlot(parsedData.Plot);
        toggleIsMovieLoaded(true);
        toggleLoaderStatus(false);
      } else {
        console.log("movie ID not loaded");
        toggleIsMovieLoaded(false);
      }
    }

    getMovieInfo();
  });

  return (
    <div>
      <div className="navbar">
        <h1>MoviesMonkey</h1>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleSwitch} />
        </div>
      </div>

      {
        props.movieID !== "" ?
          loaderStatus === true ?
            <div  className="wrongMovie" style={errorMessageDiv}>
                <center><h1>Loading....</h1></center>
                <Spinner loaderStyle={loaderStyle} />
            </div>
          :
          <div className="singleMovieBox">
            <div className="div1">
              <img src={loadedMoviePoster} alt="Poster not loaded" />
            </div>
            <div style={movieDivBK} className="div2" >
              <h2>{loadedMovieName}</h2>
              <h4>{loadedMovieYear}</h4>
              <h6>{loadedMovieActors}</h6>
              <h6>{loadedMovieGenre}</h6>
              <h6>{loadedMoviePlot}</h6>
            </div>
          </div>
          :
            <SingleMovieReloadError errorMessageDiv={errorMessageDiv} errorMessage={errorMessage} loaderStyle={loaderStyle} />
      }

    </div>
  )
}

export default SingleMovieInfo;