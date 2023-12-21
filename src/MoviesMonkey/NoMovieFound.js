import React from 'react';
import Spinner from './Spinner';
import "./Style.css";

function NoMovieFound(props){
  return (
    <div>
      <Spinner loaderStyle={props.loaderStyle}/>
      <div className="wrongMovie" style={props.movieStyle}>
        <center><h1>No such movie found named <u>"{props.movieName}"</u>, please correct the movies name.....</h1></center>
      </div>
    </div>
  )
}

export default NoMovieFound;
