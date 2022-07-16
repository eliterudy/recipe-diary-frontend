import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import useHover from '../generic/useHover';

const Header = ({modalCallback}: any) => {
  const [isNavOpen, updateNavOpen] = useState(false);
  const [myStuffStyle, updateMyStuffStyle] = useState({
    color: '#777',
    // transition: '0.2s',
    cursor: 'pointer',
  });

  var username: HTMLInputElement | HTMLTextAreaElement | null = null;
  var password: HTMLInputElement | HTMLTextAreaElement | null = null;
  var remember: HTMLInputElement | HTMLTextAreaElement | null = null;
  // let location = useLocation();

  const toggleNav = () => {
    updateNavOpen(!isNavOpen);
  };

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(
      'Username: ' +
        username +
        ', Password: ' +
        password +
        ', Remember?  : ' +
        remember,
    );
  };

  return (
    <>
      {/* Show toggle button when size is smaller than md */}
      <Navbar light expand="md" className="noselect border-bottom">
        <div
          className="noselect container-fluid px-sm-4 row mx-sm-0"
          // style={{display: 'flex', flexDirection: 'row'}}
        >
          {/* Toggle button to show/hide recipes list/elements */}
          <NavbarToggler
            className="noselect col-auto"
            onClick={() => toggleNav()}
          />
          <NavbarBrand
            className="noselect col-8 col-sm-3 m-sm-0 p-sm-0"
            href="/">
            <div className="noselect d-flex flex-row align-items-center ">
              <img
                className="noselect col-auto"
                src="../../assets/icons/app_logo.png"
                height={50}
                width={50}
                alt="The Cook Book"
              />
              <span className="noselect   col-auto  mb-0 h-25 align-middle h5">
                The Cook Book
              </span>
            </div>
          </NavbarBrand>
          {/* Wrapper to collapse. Has a key isOpen  */}
          <Collapse
            className="noselect col-sm-7  flex-row justify-content-between "
            isOpen={isNavOpen}
            navbar>
            {/* Navigation */}
            <Nav navbar>
              <NavItem className="noselect me-2">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/home">
                  <strong>Home</strong>
                </NavLink>
              </NavItem>
              <NavItem className="noselect mx-sm-1">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/recipes">
                  <strong>Recipes</strong>
                </NavLink>
              </NavItem>
              <NavItem className="noselect mx-sm-1">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/about-us">
                  <strong>Find recipe</strong>
                </NavLink>
              </NavItem>
              {!userState.user && (
                <div
                  onMouseEnter={() =>
                    updateMyStuffStyle({
                      color: '#06a',
                      // transition: '0.2s',
                      cursor: 'pointer',
                    })
                  }
                  onMouseLeave={() =>
                    updateMyStuffStyle({
                      color: '#777',
                      // transition: '0.2s',
                      cursor: 'pointer',
                    })
                  }
                  style={myStuffStyle}
                  className="noselect mt-2 mx-3"
                  onClick={() => modalCallback()}>
                  <i className="noselect fa fa-lock me-1" />
                  <strong style={{cursor: 'pointer'}}>My Stuff</strong>
                </div>
              )}
              {userState.user && (
                <NavItem className="noselect mx-sm-1">
                  <NavLink
                    tag={RRNavLink}
                    className={'nav-link '}
                    to="/my-stuff">
                    <strong>My Stuff</strong>
                  </NavLink>
                </NavItem>
              )}
              <NavItem className="noselect mx-sm-1">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/contact-us">
                  <strong>Contact Us</strong>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="noselect ml-auto" navbar>
              <NavItem className="noselect mx-sm-1">
                <Button outline onClick={() => {}}>
                  <span className="noselect   fa fa-sign-in fa-lg">{` Login `}</span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
