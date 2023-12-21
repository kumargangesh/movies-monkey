import React, { Component } from 'react';
import "./Style.css";
import InternetIssueImage from "./InterNet-Issue.jpg";
import Spinner from "./Spinner";

class InternetIssue extends Component {
  constructor(){
      super();  
      this.state = {
        switch: false,
        textColor : {
            color : "BFA181"
        }
      }
  }
  render() {

    const toggleSwitch = () => {
        if (this.state.switch === true) {
            document.body.style.backgroundColor = "rgb(12, 25, 37)";
            this.setState({textColor : {color : "#BFA181"}});
            this.setState({ switch: false });
        } else if (this.state.switch === false) {
            document.body.style.backgroundColor = "#F0FFFA";
            this.setState({textColor : {color : "black"}});
            this.setState({ switch: true });
        }
    }

    return (
        <div>
            <div className="navbar">
                <h1>MoviesMonkey</h1>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleSwitch} />
                </div>
            </div>
            <div className="internetIssue">
                <img src={InternetIssueImage} alt="imageNotLoaded" />
                <Spinner loaderStyle={this.props.loaderStyle}/>
                <h1 style={this.state.textColor}>Please provide a stable <u>Internet Connection</u> to enjoy the website</h1>
            </div>
        </div>
    )
  }
}

export default InternetIssue;
