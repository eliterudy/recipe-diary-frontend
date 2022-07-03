import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container ms-2 me-2">
        <div className="row justify-content-between align-items-center">
          <div className="col-12  col-sm-4 align-items-center justify-content-center">
            <ul className="list-unstyled d-flex flex-row col-sm-8 ms-sm-5 mb-0">
              <li className="me-2">
                <Link to="/home">Home</Link>
              </li>
              <li className="me-2">
                <Link to="/aboutus">About</Link>
              </li>
              <li className="me-2">
                <Link to="/recipes">Recipes</Link>
              </li>
              <li className="me-2">
                <Link to="/contactus">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4 align-items-center justify-content-center">
            <p className="mb-0 " style={{color: '#ddd', textAlign: 'center'}}>
              © Copyright 2022 The Cook Book
            </p>
          </div>

          <div className="col-12 col-sm-4 row d-flex flex-row align-items-center justify-content-end">
            <span className="w-auto" style={{color: '#ddd'}}>
              Share with friends
            </span>
            <div className="w-auto">
              <a
                className="me-1 btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id=">
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="me-1 btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/">
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                className="me-1 btn btn-social-icon btn-twitter"
                href="http://twitter.com/">
                <i className="fa fa-twitter"></i>
              </a>

              <a
                className="me-1 btn btn-social-icon btn-instagram"
                href="mailto:">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
