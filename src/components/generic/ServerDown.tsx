import React, {useState, useRef, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
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
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {images} from '../../config/configuration';
import apis from '../../config/api';
import actions from '../../redux/actionReducers/index';
const {loadUser, removeUser} = actions;

const ServerDown = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();

  const validateUser = (redirectPath: any) => {
    var userToken = localStorage.getItem('token');
    userToken &&
      userToken.length > 0 &&
      apis
        .getUserDetails()
        .then(({data}) => {
          dispatch(loadUser(data));
          navigate('/');
        })
        .catch(err => {
          alert(
            'Server is not up yet! Please try again later or in a few minutes',
          );
        });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center pb-5 mb-5">
      <img
        src={images.server_down}
        style={{width: 300}}
        className="mt-5 pt-5 img-fluid"
        alt="server down"
      />
      <span className="text-center">
        <h3>Server under maintainance! </h3>
        <br />{' '}
        <h6 className="col-12 px-3">
          Sorry for the inconvenience, we're currently experiencing server
          issues. Our team is working on it and have the server running back in
          no time.
        </h6>
      </span>
      <Button
        className="bg-success my-4 px-5"
        onClick={() => {
          apis
            .checkServerConnection()
            .then(resp => {
              if (location && location.state) {
                const {redirectPath} = location.state as {redirectPath: string};
                if (redirectPath === '/routes') {
                  validateUser(redirectPath);
                } else {
                  navigate(redirectPath);
                }
              } else {
                navigate('/');
              }
            })
            .catch(err =>
              alert(
                'Server is not up yet! Please try again later or in a few minutes',
              ),
            );
        }}>
        TRY AGAIN
      </Button>
    </div>
  );
};

export default ServerDown;
