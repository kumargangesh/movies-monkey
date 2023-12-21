import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import InternetNotFound from "./InternetNotFound";
import MovieComponent from './MovieComponent';
import NoMovieFound from './NoMovieFound';
// import Spinner from './Spinner';
import "./Style.css";

function FrontPage(props) {

    const [loadingStatus, toggleLoadingStatus] = useState(false);
    const [internetIssue, toggleInternetIssue] = useState(true);
    const [isMovieFound, toggleIsMovieFound] = useState(true);
    const [switchValue, changeSwitch] = useState(false);
    const [movieNames, setMovieNames] = useState([]);
    const [movie1, setMovie1] = useState();
    const [movie2, setMovie2] = useState();
    const [movie3, setMovie3] = useState();
    const [movieName, setMovieName] = useState("");
    const [falseMovieName, toggleFalseMovieName] = useState("");
    const [wrongMovieStyle, setWrongMovieStyle] = useState({
        color: "BFA181"
    });
    const [loaderStyle, changeLoaderStyle] = useState({color : "white"});

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("https://www.omdbapi.com/?s=avenger&apikey=5f315efc");
                const parsedData = await data.json();
                parsedData.Search.map((name) => {
                    movieNames.push(name);
                });
                console.log(movieNames);
                toggleInternetIssue(false);
                setMovie1(movieNames[0].Poster);
                setMovie2(movieNames[1].Poster);
                setMovie3(movieNames[2].Poster);
                toggleLoadingStatus(true);
            }catch(e){
                console.log("Error in FrontPage.js : "+e);
                toggleInternetIssue(true);
                toggleLoadingStatus(false);
            }
        })();
    }, []);

    const toggleSwitch = () => {
        if (switchValue === true) {
            document.body.style.backgroundColor = "rgb(12, 25, 37)";
            setWrongMovieStyle({
                color: "BFA181"
            });
            changeSwitch(false);
            changeLoaderStyle({color : "white"});
        } else if (switchValue === false) {
            document.body.style.backgroundColor = "#F0FFFA";
            setWrongMovieStyle({
                color: "black"
            });
            changeSwitch(true);
            changeLoaderStyle({color : "black"});
        }
    }

    const handleInputTag = (event) => {
        setMovieName(event.target.value);
    }

    const insertMovieName = () => {
        console.log(movieName);
        if (movieName.length > 0) {
            giveMoviesList(movieName);
        } else {
            alert("Please enter the movie name");
        }
    }

    const emptyArray = () => {
        while (movieNames.length !== 0) {
            movieNames.pop();
        }
    }

    const giveMoviesList = async (movieName) => {
        const responseData = await fetch("https://www.omdbapi.com/?s=" + movieName + "&apikey=5f315efc");
        const parsedResponse = await responseData.json();
        console.log(parsedResponse.Response);
        if (parsedResponse.Response === "True") {
            emptyArray();
            parsedResponse.Search.map((name) => {
                movieNames.push(name);
            });
            toggleIsMovieFound(true);
            setMovie1(movieNames[0].Poster);
            setMovie2(movieNames[1].Poster);
            setMovie3(movieNames[2].Poster);
            console.log(movieNames);
        } else if (parsedResponse.Response === "False") {
            alert("Please correct the movie name");
            toggleFalseMovieName(movieName);
            setMovieName("");
            toggleIsMovieFound(false);
            setMovie1(movieNames[0].Poster);
            setMovie2(movieNames[1].Poster);
            setMovie3(movieNames[2].Poster);
            console.log(movieNames);
        }
    }

    return (
        <div>
            {
                internetIssue !== true ?
                    <div>
                        <div className="navbar">
                            <h1>MoviesMonkey</h1>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleSwitch} />
                            </div>
                        </div>

                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <img src={movie1} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src={movie2} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={movie3} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search Movie By Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleInputTag} value={movieName} />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={insertMovieName}>Search</button>
                        </div>

                        <div className="line" />

                        <div className="container">
                            <div className="row">
                                {
                                    isMovieFound === true ?

                                        loadingStatus && movieNames.map((element) => {
                                            return (
                                                <div className="col-md-3 again" key={element.imdbID}>
                                                    <MovieComponent title={element.Title} Year={element.Year} Poster={element.Poster} ID={element.imdbID} movieID={props.ID} setMovieID={props.setID} />
                                                </div>
                                            );
                                        })

                                        :
                                        <NoMovieFound movieName={falseMovieName} movieStyle={wrongMovieStyle} loaderStyle={loaderStyle} />
                                }
                            </div>
                        </div>

                    </div>
                    :
                    <InternetNotFound loaderStyle={loaderStyle} />
            }
        </div>
    )
}

export default FrontPage;
