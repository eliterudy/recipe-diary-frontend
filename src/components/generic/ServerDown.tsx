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
import {icons} from '../../config/configuration';
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
          navigate(redirectPath);
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
      <Button
        className="bg-success my-4"
        onClick={() => {
          apis
            .checkServerConnection()
            .then(resp => {
              if (location && location.state) {
                console.log('hereee', location);

                const {redirectPath} = location.state as {redirectPath: string};
                if (redirectPath === '/') {
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
        Try Now
      </Button>
    </div>
  );
};

export default ServerDown;
