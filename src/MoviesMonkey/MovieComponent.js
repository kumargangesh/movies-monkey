import React from 'react';
import "./Style.css";
import DefaultMovie from "./Default-Movie-Poster.jpg";
import {Link} from "react-router-dom";

function MovieComponent(props) {

    const singleMovie = async() => {
        props.setMovieID(props.ID);
    }

    return (
        <div className="container">
            <div className="card">
                {
                    props.imageURL === "N/A" ?
                        <img src={DefaultMovie} className="card-img-top" alt="Server Busy" />
                        :
                        <img src={props.Poster} className="card-img-top" alt="Server Busy" />
                }
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.Year}</p>
                    <Link to="/moviesearch"><button className="btn btn-success" onClick={singleMovie}>Enter Into Movie</button></Link>
                </div>
            </div>
        </div>
    )
}

export default MovieComponent;
