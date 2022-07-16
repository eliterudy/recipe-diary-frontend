import React, {useState, useRef, useEffect} from 'react';
import {
  Navbar,
  InputGroup,
  Input,
  Label,
  Form,
  FormGroup,
  Button,
} from 'reactstrap';

import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';

const LoginComponent = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const {userState} = state;
  const signInButtonStyle = cssHover(
    {
      borderWidth: 1,
      borderColor: '#2785bd',
      backgroundColor: '#2785bd',
      color: 'white',
    },
    {
      borderWidth: 1,
      borderColor: '#2785bd',
      backgroundColor: 'white',
      color: '#2785bd',
    },
    {
      cursor: 'pointer',
      width: '100%',
    },
  );

  const signUpButtonStyle = cssHover(
    {
      borderWidth: 1,
      borderColor: '#2b59a1',
      backgroundColor: '#2b59a1',
      color: 'white',
    },
    {
      borderWidth: 1,
      borderColor: '#2b59a1',
      backgroundColor: 'white',
      color: '#2b59a1',
    },
    {
      cursor: 'pointer',
      width: '100%',
    },
  );

  return (
    <div className="p-3">
      <div className="noselect col-12 d-flex flex-row justify-content-center my-5  ">
        <div className="noselect col-12 col-sm-6 m-2">
          <div className="col-12  p-4 border">
            <div className=" mx-5 d-flex flex-column align-items-center">
              <img
                className="noselect m-auto"
                src="../../assets/icons/app_logo.png"
                height={100}
                width={100}
                alt="The Cook Book"
              />
              <span className="noselect   col-auto  mb-0 h-25 align-middle h5">
                {`The \nCook\n Book`}
              </span>
            </div>
            <div className="col-12  mt-3  p-3 ">
              <Form>
                <FormGroup className="mb-4">
                  <Label for="password">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Example: john"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Example: ****"
                  />
                </FormGroup>
                <Button {...signInButtonStyle}>Sign In</Button>
              </Form>
            </div>
            <div className="d-flex flex-row align-items-center my-3">
              <div style={{flex: 1}} className="border-bottom" />
              <span>{` or `}</span>
              <div style={{flex: 1}} className="border-bottom" />
            </div>
            <div className="col-12  p-3 ">
              <p className="text-center">
                <span>
                  If you haven't signed up with us yet and wish to access
                  premium features, sign up today
                </span>
              </p>
              <Button {...signUpButtonStyle}>Create an account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
