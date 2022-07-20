import React, {useState, useRef, useEffect} from 'react';
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
} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {useMediaQuery} from 'react-responsive';
import actions from '../../redux/actionReducers/index';

const {loadUser, removeUser} = actions;

const SignInComponent = () => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const [isErrorVisible, updateErrorVisible] = useState(false);

  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const {userState} = state;
  const signInButtonStyle = cssHover(
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

  const signUpButtonStyle = cssHover(
    {
      borderWidth: 1,
      borderColor: '#2b3c65',
      backgroundColor: '#2b3c65',
      color: 'white',
    },
    {
      borderWidth: 1,
      borderColor: '#2b3c65',
      backgroundColor: 'white',
      color: '#2b3c65',
    },
    {
      cursor: 'pointer',
      width: '100%',
    },
  );

  return (
    <div className="p-3">
      <div className="noselect col-12 d-flex flex-row justify-content-center my-5  ">
        <div className="noselect col-12 col-sm-9 col-md-7 col-xl-5 m-2">
          <div
            className="col-12  p-4"
            style={isTabletOrMobile ? {} : {border: '1px solid #eee'}}>
            <div className=" mx-5 d-flex flex-column align-items-center">
              <img
                className="noselect m-auto"
                src="../../assets/icons/app_logo.png"
                height={100}
                width={100}
                alt="Recipe Diary"
              />
              <span className="noselect col-auto  mb-0 mt-2 align-middle h3 ">
                {`Sign in to Recipe Diary`}
              </span>
            </div>
            <div className="col-12  mt-3  p-3 ">
              {isErrorVisible && (
                <div
                  className="col-12 py-2 px-3 mb-3 "
                  style={{
                    borderRadius: 5,
                    border: '1px solid #ff9f94',
                    backgroundColor: '#ffcdc7',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <span style={{fontSize: 14, color: '#c41400'}}>
                    Incorrect username or password
                  </span>
                  <i
                    className="fa fa-close "
                    onClick={() => updateErrorVisible(false)}></i>
                </div>
              )}
              <Form>
                <FormGroup className="mb-4">
                  <Label for="password">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                  />
                  <FormText>Example: john</FormText>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                  />
                  <FormText>Example: ****</FormText>
                </FormGroup>
                <Button
                  {...signInButtonStyle}
                  onClick={e => {
                    e.preventDefault();
                    updateErrorVisible(true);
                    dispatch(loadUser(null));
                    navigate('/home');
                  }}>
                  Sign In
                </Button>
              </Form>
            </div>
            <div className="d-flex flex-row align-items-center my-3">
              <div style={{flex: 1}} className="border-bottom" />
              <span className="mx-2">{` or `}</span>
              <div style={{flex: 1}} className="border-bottom" />
            </div>

            <div className="col-12  p-3 ">
              <p className="text-center">
                <span style={{fontSize: 14}}>
                  If you haven't signed up with us yet and wish to access
                  premium features, sign up today
                </span>
              </p>
              <Button
                {...signUpButtonStyle}
                onClick={() => {
                  navigate('/auth/signup');
                }}>
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
