import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

const Home = () => {
  return (
    <>
      {' '}
      <div
        id="intro"
        style={{
          backgroundImage: 'url(../../assets/images/food-background-1.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="bg-image shadow-2-strong vh-100 vw-100">
        <div
          className="mask vh-100 vw-100"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <div className="container d-flex align-items-center justify-content-center text-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Learn Healthy and Tasty Recipes</h1>
              <h5 className="mb-4">Easy & Professional Indian recipes</h5>
              <a
                className="btn btn-outline-light btn-lg m-2"
                href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                role="button"
                rel="nofollow"
                target="_blank">
                Explore
              </a>
              <a
                className="btn btn-outline-light btn-lg m-2"
                href="https://mdbootstrap.com/docs/standard/"
                target="_blank"
                role="button">
                Today's specials
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
