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

const ServerDown = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center pb-5 mb-5">
      <img
        src={icons.server_down}
        style={{width: 600, height: 600}}
        className="mt-5 pt-5"
      />
      <span className="text-center">
        <h3>Server under maintainance! </h3>
        <br />{' '}
        <h6>
          The server seems to be currenly down due to maintainance purposes.
          Please try again later
        </h6>
      </span>
      <Button className="bg-success my-4" onClick={() => navigate('/')}>
        Try Now
      </Button>
    </div>
  );
};

export default ServerDown;
