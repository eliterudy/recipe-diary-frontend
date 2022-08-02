import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="noselect footer">
      <div className="noselect mx-4">
        <div className="noselect row justify-content-center align-items-center col-12">
          <div className="noselect col-12 col-sm-4 align-items-center ">
            <ul className="noselect list-unstyled d-flex flex-row col-12 justify-content-center align-items-center mb-0  ">
              <li className="noselect me-2">
                <Link to="/">Home</Link>
              </li>
              <li className="noselect me-2">
                <Link to="/main/my-profile">My Profile</Link>
              </li>
              <li className="noselect me-2">
                <Link to="/main/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="noselect col-12 col-sm-4 align-items-center justify-content-around">
            <p
              className="noselect mb-0 "
              style={{color: '#ddd', textAlign: 'center'}}>
              © Copyright 2022 Recipe Diary
            </p>
          </div>

          <div className="noselect col-12 col-sm-4 row d-flex flex-row align-items-center justify-content-center mt-2 mt-sm-0">
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
