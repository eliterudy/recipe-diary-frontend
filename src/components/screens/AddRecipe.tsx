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
  Spinner,
} from 'reactstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {cssHover} from '../generic/hoverProps';
import {useMediaQuery} from 'react-responsive';
import actions from '../../redux/actionReducers/index';
import FormValidators from '../generic/FormValidators';
import apis from '../../config/api';
import api from '../../config/api';
import {icons} from '../../config/configuration';

const AddRecipeComponent = () => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  let locationParams = useLocation();

  const [formIngredients, updateFormIngredients] = useState('');
  const [formInstructions, updateFormInstructions] = useState('');

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {user} = state.userState;
  const {isAddingRecipe} = state.recipeState;

  const [formErrors, updateFormErrors] = useState({
    title: '',
    cuisine: '',
    diet: '',
    course: '',
    servings: '',
    prepTimeInMins: '',
    cookTimeInMins: '',
    imageUrl: '',
    ingredients: '',
    instructions: '',
  });

  const [formValues, updateFormValues] = useState({
    title: '',
    cuisine: '',
    diet: '',
    course: 'Appetizers',
    servings: undefined as number | undefined,
    prepTimeInMins: undefined as number | undefined,
    cookTimeInMins: undefined as number | undefined,
    totalTimeInMins: 0,
    imageUrl: '',
    ingredients: [] as string[],
    instructions: [] as string[],
  });

  const [isErrorVisible, updateErrorVisible] = useState(false);

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

  const {textValidator, numberValidator} = FormValidators;
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
                src={icons.app_logo}
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
                    invalid={formErrors.title.length > 0}
                    value={title}
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        title: target.value,
                      });
                      updateFormErrors({
                        ...formErrors,
                        title: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        title: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.title}</FormFeedback>
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
                    invalid={formErrors.cuisine.length > 0}
                    value={cuisine}
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        cuisine: target.value,
                      });
                      updateFormErrors({
                        ...formErrors,
                        cuisine: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        cuisine: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.cuisine}</FormFeedback>
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
                    invalid={formErrors.diet.length > 0}
                    value={diet}
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        diet: target.value,
                      });
                      updateFormErrors({
                        ...formErrors,
                        diet: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        diet: textValidator(target.value, 3, 50)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.diet}</FormFeedback>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label for="course">
                    Course<span style={{color: '#c70011'}}>*</span>
                  </Label>
                  <Input
                    id="course"
                    name="course"
                    type="select"
                    value={course}
                    onChange={e => {
                      const {target} = e;

                      updateFormValues({
                        ...formValues,
                        course: target.value,
                      });
                    }}>
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
                    invalid={formErrors.servings.length > 0}
                    value={servings === undefined ? '' : servings.toString()}
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        servings: Number(target.value),
                      });
                      updateFormErrors({
                        ...formErrors,
                        servings: numberValidator(target.value)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        servings: numberValidator(target.value)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.servings}</FormFeedback>
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
                    invalid={formErrors.prepTimeInMins.length > 0}
                    value={
                      prepTimeInMins === undefined
                        ? ''
                        : prepTimeInMins.toString()
                    }
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        prepTimeInMins: Number(target.value),
                        totalTimeInMins:
                          (cookTimeInMins ? cookTimeInMins : 0) +
                          Number(target.value),
                      });
                      updateFormErrors({
                        ...formErrors,
                        prepTimeInMins: numberValidator(target.value)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        prepTimeInMins: numberValidator(target.value)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.prepTimeInMins}</FormFeedback>
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
                    invalid={formErrors.cookTimeInMins.length > 0}
                    value={
                      cookTimeInMins === undefined
                        ? ''
                        : cookTimeInMins.toString()
                    }
                    onChange={e => {
                      const {target} = e;
                      updateFormValues({
                        ...formValues,
                        cookTimeInMins: Number(target.value),
                        totalTimeInMins:
                          (prepTimeInMins ? prepTimeInMins : 0) +
                          Number(target.value),
                      });
                      updateFormErrors({
                        ...formErrors,
                        cookTimeInMins: numberValidator(target.value)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        cookTimeInMins: numberValidator(target.value)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.cookTimeInMins}</FormFeedback>
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
                    value={totalTimeInMins}
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Label for="poster">
                    Recipe poster
                    <span style={{color: '#4E9F3D'}}>*</span>
                  </Label>
                  <FormText>
                    <br />
                    Upload an image with at least 1080px width and 720px height.
                    <br />
                    <span style={{color: '#4E9F3D'}}>
                      For Best quality poster upload a picture, whose
                      {` width > 1500px and height > 1080px`}
                    </span>
                  </FormText>
                  <Input
                    type="file"
                    name="poster"
                    id="poster"
                    accept="image/*"
                    onChange={e => {
                      var file = e.target.files;
                      if (file && file.length > 0) {
                        const formData = new FormData();
                        formData.append('file', file[0]);

                        apis
                          .postRecipeImage(formData, {folder: 'recipes'})
                          .then(({data}) => {
                            updateFormValues({
                              ...formValues,
                              imageUrl: data.url,
                            });
                          })
                          .catch(err => {
                            if (
                              err &&
                              err.message &&
                              err.message === 'Network Error'
                            ) {
                              if (navigator.onLine) {
                                navigate('/server-down', {
                                  state: {
                                    redirectPath: '/main/my-profile/new/',
                                  },
                                });
                              } else {
                                alert(
                                  'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
                                );
                              }
                            }
                          });
                      }
                    }}
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
                    <span style={{color: '#4E9F3D'}}>
                      6 to 8 Spinach Leaves (Palak), 1/4 cup Black beans -
                      soaked overnight and cooked,...
                    </span>
                  </FormText>
                  <Input
                    type="textarea"
                    name="ingredients"
                    id="ingredients"
                    placeholder="500 grams Vellai Poosanikai, 1/2 teaspoon Methi Seeds (Fenugreek Seeds), . . ."
                    style={{minHeight: 200, maxHeight: 600}}
                    value={formIngredients}
                    invalid={formErrors.ingredients.length > 0}
                    onChange={e => {
                      var tempVal = e.target.value;
                      updateFormIngredients(tempVal);
                      updateFormValues({
                        ...formValues,
                        ingredients:
                          tempVal.length > 0 ? [...tempVal.split(',')] : [],
                      });
                      updateFormErrors({
                        ...formErrors,
                        ingredients: textValidator(tempVal, 15, 4000)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        ingredients: textValidator(target.value, 15, 4000)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.ingredients}</FormFeedback>
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
                    <span style={{color: '#4E9F3D'}}>
                      Layer spinach leaves over the tortilla. Lay it on a
                      plate....
                    </span>
                  </FormText>
                  <Input
                    type="textarea"
                    name="instructions"
                    id="instructions"
                    placeholder="To begin, cooker with little water, turmeric powder and salt for just 1 whistle.
                    Release the pressure naturally."
                    style={{minHeight: 200, maxHeight: 600}}
                    value={formInstructions}
                    invalid={formErrors.instructions.length > 0}
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
                      updateFormErrors({
                        ...formErrors,
                        instructions: textValidator(tempVal, 15, 4000)[0],
                      });
                    }}
                    onBlur={({target}) => {
                      updateFormErrors({
                        ...formErrors,
                        instructions: textValidator(target.value, 15, 4000)[0],
                      });
                    }}
                  />
                  <FormFeedback>{formErrors.instructions}</FormFeedback>
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
                          {instruction &&
                            instruction.length > 0 &&
                            `${index + 1}. ${instruction} `}
                        </p>
                      );
                    })}
                  </div>
                </FormGroup>

                <Col>
                  <Button
                    color="success"
                    onClick={e => {
                      e.preventDefault();
                      // updateErrorVisible(true);

                      const {
                        title,
                        cuisine,
                        diet,
                        servings,
                        prepTimeInMins,
                        cookTimeInMins,
                      } = formValues;
                      const {textValidator, numberValidator} = FormValidators;

                      if (
                        textValidator(title, 3, 50)[1] ||
                        textValidator(cuisine, 3, 50)[1] ||
                        textValidator(diet, 3, 50)[1] ||
                        numberValidator(
                          servings ? servings.toString() : '0',
                        )[1] ||
                        numberValidator(
                          prepTimeInMins ? prepTimeInMins.toString() : '0',
                        )[1] ||
                        numberValidator(
                          cookTimeInMins ? cookTimeInMins.toString() : '0',
                        )[1] ||
                        textValidator(formInstructions, 15, 4000)[1] ||
                        textValidator(formIngredients, 15, 4000)[1]
                      ) {
                        updateFormErrors({
                          ...formErrors,
                          title: textValidator(title, 3, 50)[0],
                          cuisine: textValidator(cuisine, 3, 50)[0],
                          diet: textValidator(diet, 3, 50)[0],
                          servings: numberValidator(
                            servings ? servings.toString() : '0',
                          )[0],
                          prepTimeInMins: numberValidator(
                            prepTimeInMins ? prepTimeInMins.toString() : '0',
                          )[0],
                          cookTimeInMins: numberValidator(
                            cookTimeInMins ? cookTimeInMins.toString() : '0',
                          )[0],
                          instructions: textValidator(
                            formInstructions,
                            15,
                            4000,
                          )[0],
                          ingredients: textValidator(
                            formIngredients,
                            15,
                            4000,
                          )[0],
                        });
                      } else {
                        var temp = {...formValues};
                        temp.instructions.filter(e => e.length > 0);
                        api
                          .postRecipe(formValues)
                          .then(({data}) => {
                            navigate('/main/my-profile');
                          })
                          .catch(err => {
                            if (
                              err &&
                              err.message &&
                              err.message === 'Network Error'
                            ) {
                              if (navigator.onLine) {
                                navigate('/server-down', {
                                  state: {
                                    redirectPath: '/main/my-profile/new/',
                                  },
                                });
                              } else {
                                alert(
                                  'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
                                );
                              }
                            }
                          });
                      }
                    }}>
                    {isAddingRecipe ? (
                      <div>
                        <Spinner size="sm" />
                        <span> Uploading recipe</span>
                      </div>
                    ) : (
                      <span>Submit my recipe</span>
                    )}
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
