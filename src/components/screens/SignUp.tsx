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
  Spinner,
} from 'reactstrap';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {useMediaQuery} from 'react-responsive';
import FormValidators from '../generic/FormValidators';
import debounce from 'lodash.debounce';
import api from '../../config/api';
import {update} from 'lodash';

const SignUpComponent = () => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const signUpButtonStyle = cssHover(
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
      width: '100%',
      borderWidth: 1,
      borderColor: '#2b59a1',
    },
  );
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
    };
  });
  const {userState} = state;

  const [formValues, updateFormValues] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, updateFormErrors] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [usernameAvailableMessage, updateUsernameAvailableMessage] =
    useState('');

  const [usernameAvailableStatus, updateUsernameAvailableStatus] =
    useState(false);

  useEffect(() => {
    if (!textValidator(formValues.username, 5, 20)[1]) {
      updateUsernameAvailableMessage('');
      api
        .usernameCheck({
          username: formValues.username,
        })
        .then(({data}) => {
          if (data.status === 'failed') {
            updateUsernameAvailableStatus(false);
            updateUsernameAvailableMessage(data.message);
          } else {
            if (data.status === 'success') {
              updateUsernameAvailableStatus(true);

              updateUsernameAvailableMessage(data.message);
            }
          }
        })
        .catch(err => {
          updateUsernameAvailableMessage('data.message');
        });
    }
  }, [formValues.username]);
  const {
    textValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
  } = FormValidators;
  return (
    <div className="p-3">
      <div className="noselect col-12 d-flex flex-row justify-content-center my-5  ">
        <div
          className="noselect col-12 col-sm-10 col-md-10 col-lg-8 col-xl-8 m-2 row"
          style={isTabletOrMobile ? {} : {border: '1px solid #eee'}}>
          <div className="col-12 col-md-7">
            <div className="col-12  p-2 ">
              <div className=" mx-5 mt-3 d-flex flex-column align-items-center">
                {isTabletOrMobile && (
                  <img
                    className="noselect m-auto"
                    src="../../assets/icons/app_logo.png"
                    height={100}
                    width={100}
                    alt="Recipe Diary"
                  />
                )}
                <span className="noselect col-auto  mb-0 mt-2 align-middle h3 ">
                  {`Sign Up to Recipe Diary`}
                </span>
              </div>
              <div className="col-12  mt-3  p-3 ">
                <Form>
                  <FormGroup className="mb-4">
                    <Label for="username">Username </Label>
                    <Input
                      invalid={formErrors.username.length > 0}
                      type="text"
                      name="username"
                      id="username"
                      placeholder="johndoe321"
                      value={formValues.username}
                      onChange={async ({target}) => {
                        updateFormValues({
                          ...formValues,
                          username: target.value,
                        });
                        await updateFormErrors({
                          ...formErrors,
                          username: textValidator(target.value, 5, 20)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          username: textValidator(target.value, 5, 20)[0],
                        });
                      }}
                    />
                    <FormText>
                      {usernameAvailableMessage.length > 0 &&
                        formErrors.username.length === 0 && (
                          <em
                            className={`text-${
                              usernameAvailableStatus ? 'success' : 'danger'
                            }`}>
                            <i
                              className={`fa  ${
                                usernameAvailableStatus
                                  ? 'fa-check-circle-o'
                                  : 'fa-ban'
                              }`}
                            />

                            <span> {usernameAvailableMessage}</span>
                          </em>
                        )}
                    </FormText>
                    <FormFeedback>{formErrors.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-4 fa fa-cance">
                    <Label for="firstname">First name</Label>
                    <Input
                      invalid={formErrors.firstname.length > 0}
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="John"
                      value={formValues.firstname}
                      onChange={({target}) => {
                        updateFormValues({
                          ...formValues,
                          firstname: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          firstname: textValidator(target.value, 4, 20)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          firstname: textValidator(target.value, 4, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.firstname}</FormFeedback>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="lastname">Last name</Label>
                    <Input
                      invalid={formErrors.lastname.length > 0}
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Doe"
                      value={formValues.lastname}
                      onChange={({target}) => {
                        updateFormValues({
                          ...formValues,
                          lastname: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          lastname: textValidator(target.value, 4, 20)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          lastname: textValidator(target.value, 4, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.lastname}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label for="email">Email</Label>
                    <Input
                      invalid={formErrors.email.length > 0}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="johndoe123@gmail.com"
                      value={formValues.email}
                      onChange={({target}) => {
                        updateFormValues({
                          ...formValues,
                          email: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          email: emailValidator(target.value)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          email: emailValidator(target.value)[0],
                        });
                      }}
                    />
                    {/* <FormText>Example: johndoe123@gmail.com</FormText> */}
                    <FormFeedback>{formErrors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label for="password">Password</Label>
                    <Input
                      invalid={formErrors.password.length > 0}
                      type="password"
                      name="password"
                      id="password"
                      placeholder=""
                      value={formValues.password}
                      onChange={({target}) => {
                        updateFormValues({
                          ...formValues,
                          password: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          password: passwordValidator(target.value, 6, 20)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          password: passwordValidator(target.value, 6, 20)[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label for="confirmpassword">Confirm Password</Label>
                    <Input
                      invalid={formErrors.confirmPassword.length > 0}
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      placeholder=""
                      value={formValues.confirmPassword}
                      onChange={({target}) => {
                        updateFormValues({
                          ...formValues,
                          confirmPassword: target.value,
                        });
                        updateFormErrors({
                          ...formErrors,
                          confirmPassword: confirmPasswordValidator(
                            target.value,
                            6,
                            20,
                            formValues.password,
                          )[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          confirmPassword: confirmPasswordValidator(
                            target.value,
                            6,
                            20,
                            formValues.password,
                          )[0],
                        });
                      }}
                    />
                    <FormFeedback>{formErrors.confirmPassword}</FormFeedback>
                  </FormGroup>
                  <Button
                    {...signUpButtonStyle}
                    onClick={e => {
                      e.preventDefault();
                      const {
                        username,
                        firstname,
                        lastname,
                        email,
                        password,
                        confirmPassword,
                      } = formValues;
                      const {
                        textValidator,
                        emailValidator,
                        passwordValidator,
                        confirmPasswordValidator,
                      } = FormValidators;

                      if (
                        textValidator(username, 5, 20)[1] ||
                        textValidator(firstname, 4, 20)[1] ||
                        textValidator(lastname, 4, 20)[1] ||
                        emailValidator(email)[1] ||
                        passwordValidator(password, 6, 20)[1] ||
                        confirmPasswordValidator(
                          confirmPassword,
                          6,
                          20,
                          password,
                        )[1]
                      ) {
                        updateFormErrors({
                          ...formErrors,
                          username: textValidator(username, 5, 20)[0],
                          firstname: textValidator(firstname, 4, 20)[0],
                          lastname: textValidator(lastname, 4, 20)[0],
                          email: emailValidator(email)[0],
                          password: passwordValidator(password, 6, 20)[0],
                          confirmPassword: confirmPasswordValidator(
                            confirmPassword,
                            6,
                            20,
                            password,
                          )[0],
                        });
                      } else {
                        var tempSubmit: any = {
                          ...formValues,
                          fullname:
                            formValues.firstname + ' ' + formValues.lastname,
                        };
                        delete tempSubmit['confirmPassword'];

                        console.log('tempSubmit', tempSubmit);
                        api
                          .signup(formValues)
                          .then(({data}) => {
                            console.log('data', data);
                            alert(
                              'Account sucessfully created! Redirecting to Login',
                            );
                            navigate('/auth/signin');
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      }
                    }}>
                    Sign Up
                  </Button>
                </Form>
              </div>
              <div className="col-12  p-3 ">
                <p className="text-center">
                  <span style={{fontSize: 14}}>
                    Already have an account.{' '}
                    <Link to="/auth/signin">Sign In</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {!isTabletOrMobile && (
            <div className="col-12 col-sm-5 d-flex justify-content-center align-items-center">
              <img
                className="noselect m-auto"
                src="../../assets/icons/app_logo.png"
                height={160}
                width={160}
                alt="Recipe Diary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
