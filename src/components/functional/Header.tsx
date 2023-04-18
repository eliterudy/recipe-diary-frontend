import React, {useEffect, useState} from 'react';
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
import {Avatar, AvatarGroup} from '@chakra-ui/avatar';
import {NavLink as RRNavLink, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {icons, randomColorGenerator} from '../../config/configuration';
import actions from '../../redux/actionReducers/index';
import {useMediaQuery} from 'react-responsive';

const {loadUser, removeUser} = actions;

const avatarColor = randomColorGenerator();
const Header = ({modalCallback}: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});

  const myStuffNavItemStyle = cssHover(
    {
      color: '#2b59a1',
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
  const [myProfileDropdown, updateMyProfileDropdown] = useState(false);

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

  return (
    <div className="col-12">
      {/* Show toggle button when size is smaller than md */}
      <Navbar light expand="md" className="noselect border-bottom col-12">
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
            <div
              className="noselect d-flex flex-row align-items-center"
              style={{marginLeft: 12}}>
              <img
                className="noselect col-auto"
                src={icons.app_logo}
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
            <Nav navbar className={isTabletOrMobile ? 'offset-0' : 'offset-2'}>
              <NavItem className="noselect ms-sm-4 ">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/main/home">
                  <strong>Home</strong>
                </NavLink>
              </NavItem>
              <NavItem className="noselect ms-sm-4">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/main/recipes">
                  <strong>Recipes</strong>
                </NavLink>
              </NavItem>

              {!user && (<NavItem>
                <div
                  {...myStuffNavItemStyle}
                  className="noselect mt-2  mb-3 mb-sm-2 ms-sm-4 "
                  onClick={() => modalCallback()}>
                  <i className="noselect fa fa-lock me-1" />
                  <strong style={{cursor: 'pointer'}}>My Profile</strong>
                </div>
                </NavItem>
              )}
              {user && (
                <NavItem className="noselect ms-sm-4">
                  <NavLink
                    tag={RRNavLink}
                    className={'nav-link '}
                    to="/main/my-profile">
                    <strong>My Profile</strong>
                  </NavLink>
                </NavItem>
              )}
              {/* For v2 */}
              {/* <NavItem className="noselect mx-sm-1">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/main/contact-us">
                  <strong>Contact Us</strong>
                </NavLink>
              </NavItem> */}
            </Nav>
            <Nav className="noselect ml-auto" navbar>
              {user ? (
                <Dropdown
                  isOpen={isDropdownOpen}
                  toggle={() => {
                    updateDropdown(!isDropdownOpen);
                  }}>
                  <DropdownToggle
                    style={{
                      backgroundColor: avatarColor,
                      borderRadius: 40,
                      height: 40,
                      width: 40,
                      padding: 0,
                    }}>
                    <Avatar size={'md'} name={user.fullname} />
                  </DropdownToggle>

                  <DropdownMenu style={{marginTop: 14, marginRight: -15}}>
                    <div
                      className="mx-3 mt-1 mb-2"
                      onClick={() =>
                        updateMyProfileDropdown(!myProfileDropdown)
                      }
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <span> My Profile </span>
                      {myProfileDropdown ? (
                        <i className="fa fa-chevron-down " />
                      ) : (
                        <i className="fa fa-chevron-right " />
                      )}
                    </div>

                    {myProfileDropdown && (
                      <div>
                        <DropdownItem divider />
                        {/* For v2 */}
                        {user && user.admin == true && (
                          <DropdownItem
                            onClick={() => {
                              navigate('/main/my-profile/', {
                                state: {tab: 0},
                              });
                            }}>
                            My Recipes
                          </DropdownItem>
                        )}
                        <DropdownItem
                          onClick={() => {
                            navigate('/main/my-profile/', {
                              state: {tab: 1},
                            });
                          }}>
                          Recent Viewed
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            navigate('/main/my-profile/', {
                              state: {tab: 2},
                            });
                          }}>
                          Saved Recipes
                        </DropdownItem>
                      </div>
                    )}
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={() => {
                        localStorage.setItem('token', '');

                        dispatch(removeUser());
                      }}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <NavItem className="noselect mx-sm-1">
                  <Button
                    outline
                    onClick={() => {
                      // dispatch(loadUser(null));
                      navigate('/auth/signin');
                    }}
                    {...signInButtonStyle}>
                    <span className="noselect">{` Sign In`}</span>
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
