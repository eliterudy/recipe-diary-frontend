import React, {useState, useRef, useEffect} from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {useLocation, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {useMediaQuery} from 'react-responsive';
import {icons} from '../../config/configuration';

import actionReducers from '../../redux/actionReducers/index';
const {addRecipeToFavorites, deleteRecipeFromFavorites} = actionReducers;

const RecipeDetailsComponent = (props: any) => {
  const locationParams = useLocation();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 767px)'});
  const pathSplit = locationParams.pathname.split('/');
  const recipeId = pathSplit[pathSplit.length - 1];
  const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;
  const {recipes} = recipeState;

  var getRecipeDetails = (): RecipeDetails => {
    var details = recipes.filter(
      (recipe: RecipeDetails) => recipe.id === recipeId,
    )[0];
    if (
      userState &&
      userState.favorites !== {} &&
      userState.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = userState.favorites.recipes;
      details = {
        ...details,
        isFavorite: favoriteRecipes.includes(details.id),
      };
    }
    return details;
  };

  var bookmarkIcon = () => {
    if (isMouseHoveredOnBookmarkButton) {
      return icons.bookmark_hover;
    } else if (isFavorite) {
      return icons.bookmark_selected;
    }
    return icons.bookmark_unselected;
  };
  const {
    id: recipe_id,
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
    isFavorite,
  } = getRecipeDetails();
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
          <h5 className="text-muted col-12 mb-4">{cuisine}</h5>
          <div className="row">
            <div className=" d-flex flex-wrap col-12 col-md-6 mt-2">
              <p
                className="py-1 px-3 my-1 "
                style={{
                  backgroundColor: '#78b0f0',
                  color: 'white',
                }}>
                {course}
              </p>
              <p
                className="py-1 px-3 my-1 mx-2"
                style={{
                  backgroundColor: '#b278f0',
                  color: 'white',
                }}>
                {servings} servings
              </p>
              <p
                className="py-1 px-3 my-1 "
                style={{
                  backgroundColor: '#f08878',
                  color: 'white',
                }}>
                {diet}
              </p>
            </div>
            {!isTabletOrMobile && (
              <div className="col-12 col-md-6 d-flex justify-content-end align-items-end">
                <div
                  onClick={e => {
                    e.preventDefault();
                    isFavorite
                      ? dispatch(deleteRecipeFromFavorites(recipe_id))
                      : dispatch(addRecipeToFavorites(recipe_id));
                  }}
                  className="px-4 py-1"
                  onMouseEnter={() => changeMouseStatus(true)}
                  onMouseLeave={() => changeMouseStatus(false)}
                  style={{
                    ...{
                      backgroundColor: '#2785bd',

                      color: 'white',
                      borderRadius: 50,
                      height: 32,
                    },
                    ...(isMouseHoveredOnBookmarkButton && {
                      backgroundColor: '#39a8e9',
                      cursor: 'pointer',
                    }),
                  }}>
                  <span className="">
                    {isFavorite ? 'Remove bookmark' : 'Add to Bookmarks'}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="" style={{position: 'relative'}}>
            <img
              src={imageUrl}
              className=" img-fluid center col-12 my-3"
              alt={title}
              style={{
                objectFit: 'cover',
              }}
            />
            {isTabletOrMobile && (
              <div
                className=" "
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  marginTop: 3,
                  padding: 5,
                }}>
                <img
                  onMouseDown={() => changeMouseStatus(true)}
                  onMouseUp={() => changeMouseStatus(false)}
                  className="col-auto "
                  src={bookmarkIcon()}
                  height={45}
                  width={45}
                  alt="The Cook Book"
                  onClick={e => {
                    e.preventDefault();
                    console.log('her');
                    isFavorite
                      ? dispatch(deleteRecipeFromFavorites(recipe_id))
                      : dispatch(addRecipeToFavorites(recipe_id));
                  }}
                />
              </div>
            )}
          </div>
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
