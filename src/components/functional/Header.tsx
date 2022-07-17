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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {NavLink as RRNavLink, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';

const Header = ({modalCallback}: any) => {
  const myStuffNavItemStyle = cssHover(
    {
      color: '#2785bd',
      cursor: 'pointer',
    },
    {
      color: '#777',
      cursor: 'pointer',
    },
  );

  const signInButtonStyle = cssHover(
    {
      backgroundColor: '#2b59a1',
      color: 'white',
    },
    {
      backgroundColor: 'white',
      color: '#2b59a1',
    },
    {
      cursor: 'pointer',
      border: '1px solid #2b59a1',
    },
  );

  const navigate = useNavigate();
  const [isNavOpen, updateNavOpen] = useState(false);
  const [isDropdownOpen, updateDropdown] = useState(false);
  var username: HTMLInputElement | HTMLTextAreaElement | null = null;
  var password: HTMLInputElement | HTMLTextAreaElement | null = null;
  var remember: HTMLInputElement | HTMLTextAreaElement | null = null;
  // let location = useLocation();

  const toggleNav = () => {
    updateNavOpen(!isNavOpen);
  };

  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const {userState} = state;
  const {user} = userState;
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
                alt="Recipe Diary"
              />
              <span className="noselect   col-auto  mb-0 h-25 align-middle h5">
                Recipe Diary
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
                  {...myStuffNavItemStyle}
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
              {user ? (
                <Dropdown
                  isOpen={isDropdownOpen}
                  toggle={() => updateDropdown(!isDropdownOpen)}>
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <NavItem className="noselect mx-sm-1">
                  <Button
                    outline
                    onClick={() => navigate('auth/signin')}
                    {...signInButtonStyle}>
                    <span className="noselect">{` Sign In`}</span>
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
