/* eslint-disable no-useless-escape */
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
  Row,
  Col,
  Button,
} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {useMediaQuery} from 'react-responsive';
import actions from '../../redux/actionReducers/index';

const {loadUser, removeUser} = actions;

const AddRecipeComponent = () => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [formIngredients, updateFormIngredients] = useState('');
  const [formInstructions, updateFormInstructions] = useState('');

  const [formValues, updateFormValues] = useState({
    title: '',
    cuisine: '',
    diet: '',
    course: '',
    servings: undefined,
    prepTimeInMins: undefined,
    cookTimeInMins: undefined,
    totalTimeInMins: 0,
    imageUrl: '',
    ingredients: [] as string[],
    instructions: [] as string[],
  });

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
      marginRight: 10,
    },
  );

  const goBackButtonStyle = cssHover(
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
    },
  );

  const {
    title,
    cuisine,
    diet,
    course,
    servings,
    prepTimeInMins,
    cookTimeInMins,
    totalTimeInMins,
    imageUrl,
    ingredients,
    instructions,
  } = formValues;
  const regex = new RegExp('.');
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
                {`Add New Recipe`}
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
                  <Label for="title">
                    Recipe Name<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Butter Chicken with Roasted Peanuts"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="cuisine">
                    Cuisine<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="cuisine"
                    id="cuisine"
                    placeholder="Indian, Udupi, Mexican..."
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="diet">
                    Diet<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="diet"
                    id="diet"
                    placeholder="Non Vegetarian"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="course">
                    Course<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input id="course" name="course" type="select">
                    <option>Appetizers</option>
                    <option defaultChecked>Main Course</option>
                    <option>Fish</option>
                    <option>Salad</option>
                    <option>Dessert</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="servings">
                    Serving
                    <span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="number"
                    name="servings"
                    id="servings"
                    placeholder="3"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="prepTimeInMins">
                    Preparation time (in minutes)
                    <span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="number"
                    name="prepTimeInMins"
                    id="prepTimeInMins"
                    placeholder="15"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="cookTimeInMins">
                    Cooking time (in minutes)
                    <span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    type="number"
                    name="cookTimeInMins"
                    id="cookTimeInMins"
                    placeholder="15"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="totalTimeInMins">
                    Total time to make (in minutes)
                    <span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    disabled
                    type="number"
                    name="totalTimeInMins"
                    id="totalTimeInMins"
                    placeholder="0"
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Label for="poster">
                    Recipe poster
                    <span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <FormText>
                    <br />
                    Upload an image with at least 1080px width and 720px height.
                    <br />
                    <span style={{color: '#c70011'}}>
                      For Best quality poster upload a picture, whose
                      {` width > 1500px and height > 1080px`}
                    </span>
                  </FormText>
                  <Input
                    type="file"
                    name="poster"
                    id="poster"
                    accept="image/*"
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Label for="ingredients">
                    Ingredients<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <FormText>
                    <br />
                    1. Add each ingredient with its appropriate measurements.
                    <br />
                    2. Seperate the ingredients with comma(",") for correct
                    intendation
                    <br />
                    Example:{' '}
                    <span style={{color: '#c70011'}}>
                      6 to 8 Spinach Leaves (Palak), 1/4 cup Black beans -
                      soaked overnight and cooked,...
                    </span>
                  </FormText>
                  <Input
                    type="textarea"
                    name="ingredients"
                    id="ingredients"
                    value={formIngredients}
                    onChange={e => {
                      var tempVal = e.target.value;
                      updateFormIngredients(tempVal);
                      updateFormValues({
                        ...formValues,
                        ingredients:
                          tempVal.length > 0 ? [...tempVal.split(',')] : [],
                      });
                    }}
                    placeholder="500 grams Vellai Poosanikai, 1/2 teaspoon Methi Seeds (Fenugreek Seeds), . . ."
                    style={{minHeight: 200, maxHeight: 600}}
                  />
                  <FormText>Preview</FormText>
                  <div
                    className="col-12"
                    style={{
                      border: '0.3px solid #aaa',
                      borderRadius: 2,
                      padding: 10,
                    }}>
                    {ingredients.map(ingredient => {
                      return (
                        <p
                          style={{
                            fontSize: 12,
                            color: '#666',
                            marginBottom: 3,
                          }}>
                          {ingredient}
                        </p>
                      );
                    })}
                  </div>
                </FormGroup>
                <FormGroup className="mb-5">
                  <Label for="instructions">
                    Instructions<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <FormText>
                    <br />
                    1. Add each instruction as detailed and simple to understand
                    as possible
                    <br />
                    2. Seperate the instructions with comma(",") for correct
                    intendation
                    <br />
                    Example:{' '}
                    <span style={{color: '#c70011'}}>
                      Layer spinach leaves over the tortilla. Lay it on a
                      plate....
                    </span>
                  </FormText>
                  <Input
                    type="textarea"
                    name="instructions"
                    id="instructions"
                    value={formInstructions}
                    onChange={e => {
                      var tempVal = e.target.value;
                      updateFormInstructions(tempVal);
                      updateFormValues({
                        ...formValues,
                        instructions:
                          tempVal.length > 0
                            ? [...tempVal.replaceAll('.', '.$').split('$')]
                            : [],
                      });
                    }}
                    placeholder="To begin, cooker with little water, turmeric powder and salt for just 1 whistle.
                    Release the pressure naturally."
                    style={{minHeight: 200, maxHeight: 600}}
                  />
                  <FormText>Preview</FormText>
                  <div
                    className="col-12"
                    style={{
                      border: '0.3px solid #aaa',
                      borderRadius: 2,
                      padding: 10,
                    }}>
                    {instructions.map((instruction: any, index: number) => {
                      return (
                        <p
                          style={{
                            fontSize: 12,
                            color: '#666',
                            marginBottom: 3,
                          }}>
                          {`${index + 1}. ${instruction} `}
                        </p>
                      );
                    })}
                  </div>
                </FormGroup>
                <Col></Col>
                <Col>
                  <Button
                    // {...signInButtonStyle}
                    color="success"
                    onClick={e => {
                      e.preventDefault();
                      updateErrorVisible(true);
                      // dispatch(loadUser(null));
                      // navigate('/home');
                    }}>
                    Submit my recipe
                  </Button>
                  <Button
                    // {...goBackButtonStyle}
                    style={{marginLeft: 10}}
                    onClick={() => {
                      navigate(-1);
                    }}>
                    Do it later
                  </Button>
                </Col>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeComponent;
