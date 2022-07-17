import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="noselect footer">
      <div className="noselect container ms-2 me-2">
        <div className="noselect row justify-content-between align-items-center">
          <div className="noselect col-12  col-sm-4 align-items-center justify-content-center">
            <ul className="noselect list-unstyled d-flex flex-row col-12 justify-content-center col-sm-8 ms-sm-5 mb-2 mb-sm-0">
              <li className="noselect me-2">
                <Link to="/home">Home</Link>
              </li>
              <li className="noselect me-2">
                <Link to="/aboutus">About</Link>
              </li>
              <li className="noselect me-2">
                <Link to="/recipes">Recipes</Link>
              </li>
              <li className="noselect me-2">
                <Link to="/contactus">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="noselect col-12 col-sm-4 align-items-center justify-content-center">
            <p
              className="noselect mb-0 "
              style={{color: '#ddd', textAlign: 'center'}}>
              © Copyright 2022 Recipe Diary
            </p>
          </div>

          <div className="noselect col-12 col-sm-4 row d-flex flex-row align-items-center justify-content-end mt-2 mt-sm-0">
            <span className="noselect w-auto" style={{color: '#ddd'}}>
              Share with friends
            </span>
            <div className="noselect w-auto">
              <a
                className="noselect me-1 btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id=">
                <i className="noselect fa fa-facebook"></i>
              </a>
              <a
                className="noselect me-1 btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/">
                <i className="noselect fa fa-linkedin"></i>
              </a>
              <a
                className="noselect me-1 btn btn-social-icon btn-twitter"
                href="http://twitter.com/">
                <i className="noselect fa fa-twitter"></i>
              </a>

              <a
                className="noselect me-1 btn btn-social-icon btn-instagram"
                href="mailto:">
                <i className="noselect fa fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
