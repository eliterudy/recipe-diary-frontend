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

const Header = () => {
  const [isNavOpen, updateNavOpen] = useState(false);

  const toggleNav = () => {
    updateNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Show toggle button when size is smaller than md */}
      <Navbar dark expand="md">
        <div className="container">
          {/* Toggle button to show/hide menu list/elements */}
          <NavbarToggler onClick={() => toggleNav()} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height={30}
              width={41}
              alt="The Cook Book"
            />
          </NavbarBrand>
          {/* Wrapper to collapse. Has a key isOpen  */}
          <Collapse isOpen={isNavOpen} navbar>
            {/* Navigation */}
            <Nav navbar>
              <NavItem>
                <NavLink className={'nav-link'} to="/home">
                  <span className="fa fa-home fa-lg"> Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} to="/aboutus">
                  <span className="fa fa-info fa-lg"> About Us</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} to="/menu">
                  <span className="fa fa-list fa-lg"> Menu</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} to="/contactus">
                  <span className="fa fa-address-card fa-lg"> Contact Us</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={() => {}}>
                  <span className=" fa fa-sign-in fa-lg"> Login</span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <div className="jumbotron">
        <div className="container">
          <div className="row row-header">
            <div
              className="col-12 col-sm-8 pt-5"
              style={{backgroundColor: 'red'}}>
              <h1 style={{backgroundColor: 'green'}}>The Cook Book</h1>
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
