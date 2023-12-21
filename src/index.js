import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './MoviesMonkey/Routing';
// import Checking from './newmonkey/Checking';
// import InternetIssue from './newmonkey/InternetIssue';
// import NewFrontPage from './newmonkey/NewFrontPage';
// import NoMovieFound from './newmonkey/NoMovieFound';
// import NavbarLinks from './Navbar/NavbarLinks'; for the Navbar Component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<Routing />, document.getElementById("root"));
reportWebVitals();
