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
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {useMediaQuery} from 'react-responsive';

const required = (val: any) => val && val.length > 0;
const maxLength = (val: any, len: any) => val.length < len;
const minLength = (val: any, len: any) => val.length >= len;
const isNumber = (val: any) => !isNaN(Number(val));
const validEmail = (val: any) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const FormValidators = {
  nameValidator: (value: string): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, 2)) {
      error = `Should be atleast ${2} characters!`;
    } else if (!maxLength(value, 20)) {
      error = `Should be at most ${20} characters!`;
    }
    return [error, error.length > 0];
  },
  emailValidator: (value: string): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!validEmail(value)) {
      error = 'Should be a valid email.';
    }
    return [error, error.length > 0];
  },
  passwordValidator: (value: string): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, 6)) {
      error = `Should be atleast ${6} characters!`;
    } else if (!maxLength(value, 15)) {
      error = `Should be at most ${15} characters!`;
    }
    return [error, error.length > 0];
  },
  confirmPasswordValidator: (
    value: string,
    matchTo: string,
  ): [string, boolean] => {
    var error = '';
    if (!required(value)) {
      error = 'Required!';
    } else if (!minLength(value, 6)) {
      error = `Should be atleast ${6} characters!`;
    } else if (!maxLength(value, 15)) {
      error = `Should be at most ${15} characters!`;
    } else if (value !== matchTo) {
      error = `Passwords dont match!`;
    }
    return [error, error.length > 0];
  },
};

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
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, updateFormErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    nameValidator,
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
          <div className="col-12 col-sm-7">
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
                          firstname: nameValidator(target.value)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          firstname: nameValidator(target.value)[0],
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
                          lastname: nameValidator(target.value)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          lastname: nameValidator(target.value)[0],
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
                          password: passwordValidator(target.value)[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          password: passwordValidator(target.value)[0],
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
                            formValues.password,
                          )[0],
                        });
                      }}
                      onBlur={({target}) => {
                        updateFormErrors({
                          ...formErrors,
                          confirmPassword: confirmPasswordValidator(
                            target.value,
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
                        firstname,
                        lastname,
                        email,
                        password,
                        confirmPassword,
                      } = formValues;
                      const {
                        nameValidator,
                        emailValidator,
                        passwordValidator,
                        confirmPasswordValidator,
                      } = FormValidators;
                      console.log(
                        nameValidator(firstname)[1],
                        nameValidator(lastname)[1],
                        emailValidator(email)[1],
                        passwordValidator(password)[1],
                        confirmPasswordValidator(confirmPassword, password)[1],
                        nameValidator(firstname)[1] &&
                          nameValidator(lastname)[1] &&
                          emailValidator(email)[1] &&
                          passwordValidator(password)[1] &&
                          confirmPasswordValidator(
                            confirmPassword,
                            password,
                          )[1],
                      );
                      if (
                        nameValidator(firstname)[1] ||
                        nameValidator(lastname)[1] ||
                        emailValidator(email)[1] ||
                        passwordValidator(password)[1] ||
                        confirmPasswordValidator(confirmPassword, password)[1]
                      ) {
                        updateFormErrors({
                          ...formErrors,
                          firstname: nameValidator(firstname)[0],
                          lastname: nameValidator(lastname)[0],
                          email: emailValidator(email)[0],
                          password: passwordValidator(password)[0],
                          confirmPassword: confirmPasswordValidator(
                            confirmPassword,
                            password,
                          )[0],
                        });
                      } else {
                        navigate('/');
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
