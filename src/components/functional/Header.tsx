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
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const Header = () => {
  const [isNavOpen, updateNavOpen] = useState(false);
  const [isModalOpen, updateModalOpen] = useState(false);
  var username: HTMLInputElement | HTMLTextAreaElement | null = null;
  var password: HTMLInputElement | HTMLTextAreaElement | null = null;
  var remember: HTMLInputElement | HTMLTextAreaElement | null = null;
  // let location = useLocation();

  const toggleNav = () => {
    updateNavOpen(!isNavOpen);
  };

  const toggleModal = () => {
    updateModalOpen(!isModalOpen);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateModalOpen(!isModalOpen);
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
      <Navbar light expand="md" className="border-bottom">
        <div
          className="container-fluid px-sm-4 row mx-sm-0"
          // style={{display: 'flex', flexDirection: 'row'}}
        >
          {/* Toggle button to show/hide recipes list/elements */}
          <NavbarToggler className="col-auto" onClick={() => toggleNav()} />
          <NavbarBrand className="col-8 col-sm-3 m-sm-0 p-sm-0" href="/">
            <div className="d-flex flex-row align-items-center ">
              <img
                className="col-auto"
                src="../../assets/icons/app_logo.png"
                height={50}
                width={50}
                alt="The Cook Book"
              />
              <span className="  col-auto  mb-0 h-25 align-middle h5">
                The Cook Book
              </span>
            </div>
          </NavbarBrand>
          {/* Wrapper to collapse. Has a key isOpen  */}
          <Collapse
            className="col-sm-7  flex-row justify-content-between "
            isOpen={isNavOpen}
            navbar>
            {/* Navigation */}
            <Nav navbar>
              <NavItem className="me-2">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/home">
                  <strong>Home</strong>
                </NavLink>
              </NavItem>

              <NavItem className="mx-sm-1">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/recipes">
                  <strong>Recipes</strong>
                </NavLink>
              </NavItem>
              <NavItem className="mx-sm-1">
                <NavLink tag={RRNavLink} className={'nav-link '} to="/aboutus">
                  <strong>Find recipe</strong>
                </NavLink>
              </NavItem>
              <NavItem className="mx-sm-1">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/contactus">
                  <strong>My stuff</strong>
                </NavLink>
              </NavItem>
              <NavItem className="mx-sm-1">
                <NavLink
                  tag={RRNavLink}
                  className={'nav-link '}
                  to="/contactus">
                  <strong>Contact Us</strong>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem className="mx-sm-1">
                <Button outline onClick={() => {}}>
                  <span className="  fa fa-sign-in fa-lg">
                    {`  
                    Login
 `}
                  </span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => handleLogin(e)}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                innerRef={input => (username = input)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={input => (password = input)}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="remember"
                  innerRef={input => (remember = input)}
                />{' '}
                Remember me
              </Label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;
