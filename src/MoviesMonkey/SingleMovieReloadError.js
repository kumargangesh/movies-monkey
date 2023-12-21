import React from 'react';
import "./Style.css";
import Spinner from './Spinner';

function SingleMovieReloadError(props) {
    return (
        <div className="wrongMovie" style={props.errorMessageDiv}>
            <center><h1>{props.errorMessage}</h1></center>
            <Spinner loaderStyle={props.loaderStyle} />
        </div>
    )
}

export default SingleMovieReloadError;