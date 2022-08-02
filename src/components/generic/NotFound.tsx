import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Navbar,
  InputGroup,
  Input,
  Label,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Button,
  Col,
} from 'reactstrap';
import {icons} from '../../config/configuration';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center pb-5 mb-5">
      <img src={icons.route_not_found} className="mt-5 pt-5" />
      <span className="text-center">
        <h3>Page not found! </h3>
        <br /> <h6> You may have entered a wrong url!</h6>
      </span>
      <Button className="bg-success my-4" onClick={() => navigate('/')}>
        Take Me Home
      </Button>
    </div>
  );
};

export default NotFound;
