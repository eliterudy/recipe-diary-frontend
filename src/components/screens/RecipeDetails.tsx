import React, {useState, useRef, useEffect} from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {useLocation, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {useMediaQuery} from 'react-responsive';

const RecipeDetailsComponent = (props: any) => {
  const locationParams = useLocation();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'});
  const {state: paramState}: any = locationParams;
  const pathSplit = locationParams.pathname.split('/');
  const recipeId = pathSplit[pathSplit.length - 1];
  useEffect(() => {
    console.log('AAAAA', paramState['recipeId']);
  }, []);

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
    };
  });
  const {recipeState} = state;
  const {recipes} = recipeState;

  var recipeDetails = recipes.filter(
    (recipe: RecipeDetails) => recipe.id === recipeId,
  )[0];

  const {
    title,
    ingredients,
    instructions,
    imageUrl,
    cuisine,
    prepTimeInMins,
    cookTimeInMins,
    totalTimeInMins,
    diet,
    servings,
    course,
    ingredientCount,
    ingredientsUsed,
  } = recipeDetails;
  return (
    <>
      {!isTabletOrMobile && (
        <div className="" style={{}}>
          <Breadcrumb className="mt-2 mx-5" style={{backgroundColor: 'white'}}>
            <BreadcrumbItem>
              <Link to="/home">
                <strong>Home</strong>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <strong>Recipes</strong> / <strong>{title}</strong>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      )}
      <div className="container pb-5 ">
        <div className="px-4 pb-5">
          <h1 className=" col-12 mt-5">{title}</h1>
          <h5 className="text-muted col-12 mb-5">{cuisine}</h5>
          <div className="flex flex-row flex-wrap my-3">
            <em
              className="p-2"
              style={{backgroundColor: '#78b0f0', color: 'white'}}>
              {course}
            </em>
            <em
              className="p-2 mx-1"
              style={{backgroundColor: '#b278f0', color: 'white'}}>
              {servings} servings
            </em>
            <em
              className="p-2"
              style={{backgroundColor: '#f08878', color: 'white'}}>
              {diet}
            </em>
          </div>
          <img
            src={imageUrl}
            className=" img-fluid center col-12 my-3"
            alt={title}
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="row  mx-0">
            <div className=" col-4 d-flex flex-column align-items-center p-2 ">
              <span className="  col-auto  mb-0  ms-1 text-center">
                {`Prep Time`}
              </span>
              <strong className="col-auto  mb-0  ms-1 text-center">{` ${prepTimeInMins} min`}</strong>
            </div>
            <div className=" col-4 d-flex flex-column align-items-center p-2 ">
              <span className="  col-auto  mb-0  ms-1 text-center">
                {`Cook Time`}
              </span>
              <strong className="  col-auto  mb-0  ms-1 text-center">{` ${cookTimeInMins} min `}</strong>
            </div>
            <div className=" col-4 d-flex flex-column align-items-center  p-2 ">
              <span className="  col-auto  mb-0  ms-1 text-center">
                {`Total Time`}
              </span>
              <strong className="  col-auto  mb-0  ms-1 text-center">
                {` ${totalTimeInMins} min`}
              </strong>
            </div>
          </div>

          <h3 className=" col-12 mt-5">Ingredients</h3>
          <ul>
            {ingredients &&
              ingredients.map((ingredient: any) => {
                return <li className="mt-3">{ingredient}</li>;
              })}
          </ul>
          <h3 className=" col-12 mt-5">Instructions</h3>
          <ol>
            {instructions &&
              instructions.map((instruction: any) => {
                return <li className="mt-3">{instruction}</li>;
              })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsComponent;
