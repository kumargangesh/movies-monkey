import React from 'react';
import "./Style.css";

function Spinner(props) {
    return (
        <div>
            <div className="text-center">
                <div className="spinner-border" style={props.loaderStyle} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner;
