import React, {useState, useRef, useEffect} from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {useLocation, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {useMediaQuery} from 'react-responsive';
import {icons} from '../../config/configuration';
import {cssHover} from '../generic/hoverProps';

import actionReducers from '../../redux/actionReducers/index';
const {addRecipeToFavorites, deleteRecipeFromFavorites} = actionReducers;

const RecipeDetailsComponent = (props: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;
  const {recipes} = recipeState;

  const buttonHoverStyle = cssHover(
    {
      backgroundColor: '#39a8e9',
    },
    {
      backgroundColor: '#2785bd',
    },
    {color: 'white', borderRadius: 50, height: 32, cursor: 'pointer'},
  );

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const locationParams = useLocation();
  const pathSplit = locationParams.pathname.split('/');
  const recipeId = pathSplit[pathSplit.length - 1];

  const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);

  var getRecipeDetails = (): RecipeDetails => {
    var details = recipes.filter(
      (recipe: RecipeDetails) => recipe.id === recipeId,
    )[0];
    if (
      userState &&
      userState.user &&
      userState.user.favorites !== {} &&
      userState.user.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = userState.user.favorites.recipes;
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
        <div className="noselect " style={{}}>
          <Breadcrumb
            className="noselect mt-2 mx-5"
            style={{backgroundColor: 'white'}}>
            {pathSplit.slice(1, pathSplit.length - 1).map(value => {
              console.log(value);
              return (
                <BreadcrumbItem>
                  <Link to={`/${value}`}>
                    <strong>
                      {value.substring(0, 1).toUpperCase() + value.substring(1)}
                    </strong>
                  </Link>
                </BreadcrumbItem>
              );
            })}

            <BreadcrumbItem active>
              <strong>{title}</strong>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      )}
      <div className="noselect container pb-5 ">
        <div className="noselect px-4 pb-5">
          <h1 className="noselect  col-12 mt-5">{title}</h1>
          <h5 className="noselect text-muted col-12 mb-4">{cuisine}</h5>
          <div className="noselect row">
            <div className="noselect  d-flex flex-wrap col-12 col-md-6 mt-2">
              <p
                className="noselect py-1 px-3 my-1 "
                style={{
                  backgroundColor: '#78b0f0',
                  color: 'white',
                }}>
                {course}
              </p>
              <p
                className="noselect py-1 px-3 my-1 mx-2"
                style={{
                  backgroundColor: '#b278f0',
                  color: 'white',
                }}>
                {servings} servings
              </p>
              <p
                className="noselect py-1 px-3 my-1 "
                style={{
                  backgroundColor: '#f08878',
                  color: 'white',
                }}>
                {diet}
              </p>
            </div>
            {!isTabletOrMobile &&
              userState &&
              userState.user &&
              userState.user.favorites && (
                <div className="noselect col-12 col-md-6 d-flex justify-content-end align-items-end">
                  <div
                    onClick={e => {
                      e.preventDefault();
                      isFavorite
                        ? dispatch(deleteRecipeFromFavorites(recipe_id))
                        : dispatch(addRecipeToFavorites(recipe_id));
                    }}
                    className="noselect px-4 py-1"
                    {...buttonHoverStyle}>
                    <span className="noselect ">
                      {isFavorite ? 'Remove bookmark' : 'Add to Bookmarks'}
                    </span>
                  </div>
                </div>
              )}
          </div>
          <div className="noselect " style={{position: 'relative'}}>
            <img
              src={imageUrl}
              className="noselect  img-fluid center col-12 my-3"
              alt={title}
              style={{
                objectFit: 'cover',
              }}
            />
            {isTabletOrMobile &&
              userState &&
              userState.user &&
              userState.user.favorites && (
                <div
                  className="noselect  "
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
                    className="noselect col-auto "
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
          <div className="noselect row  mx-0">
            <div className="noselect  col-4 d-flex flex-column align-items-center p-2 ">
              <span className="noselect   col-auto  mb-0  ms-1 text-center">
                {`Prep Time`}
              </span>
              <strong className="noselect col-auto  mb-0  ms-1 text-center">{` ${prepTimeInMins} min`}</strong>
            </div>
            <div className="noselect  col-4 d-flex flex-column align-items-center p-2 ">
              <span className="noselect   col-auto  mb-0  ms-1 text-center">
                {`Cook Time`}
              </span>
              <strong className="noselect   col-auto  mb-0  ms-1 text-center">{` ${cookTimeInMins} min `}</strong>
            </div>
            <div className="noselect  col-4 d-flex flex-column align-items-center  p-2 ">
              <span className="noselect   col-auto  mb-0  ms-1 text-center">
                {`Total Time`}
              </span>
              <strong className="noselect   col-auto  mb-0  ms-1 text-center">
                {` ${totalTimeInMins} min`}
              </strong>
            </div>
          </div>

          <h3 className="noselect  col-12 mt-5">Ingredients</h3>
          <ul>
            {ingredients &&
              ingredients.map((ingredient: any) => {
                return <li className="noselect mt-3">{ingredient}</li>;
              })}
          </ul>
          <h3 className="noselect  col-12 mt-5">Instructions</h3>
          <ol>
            {instructions &&
              instructions.map((instruction: any) => {
                return <li className="noselect mt-3">{instruction}</li>;
              })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsComponent;
