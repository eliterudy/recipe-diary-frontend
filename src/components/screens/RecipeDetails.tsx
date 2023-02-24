import React, {useState, useRef, useEffect} from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col} from 'reactstrap';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {useMediaQuery} from 'react-responsive';
import {icons} from '../../config/configuration';
import {cssHover} from '../generic/hoverProps';
import actions from '../../redux/actionReducers/index';
import apis from '../../config/api';
import Generic from '../generic/Generic';

const {addRecipeToFavorites, deleteRecipeFromFavorites} = actions;

const RecipeDetailsComponent = (props: any) => {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const locationParams = useLocation();
  const pathSplit = locationParams.pathname.split('/').map(pathParam => {
    return pathParam
      .split('-')
      .map(elem => elem.substring(0, 1).toUpperCase() + elem.substring(1))
      .join(' ');
  });
  var navigate = useNavigate();
  const buttonHoverStyle = cssHover(
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
      borderRadius: 50,
      border: '1px solid #2b59a1',
    },
  );
  const recipeId = pathSplit[pathSplit.length - 1];
  const {pathDetails} = props;

  const dispatch: Dispatch<any> = useDispatch();
  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {user} = state.userState;
  const [recipeDetails, updateRecipeDetails] = useState<null | RecipeDetails>(
    null,
  );

  const [recipeLoading, updateRecipeLoading] = useState(false);
  const [recipeError, updateRecipeError] = useState(null);

  useEffect(() => {
    updateRecipeLoading(true);
    apis
      .getRecipe(recipeId)
      .then(({data}) => {
        var recipeDetails: RecipeDetails = data;
        updateRecipeDetails(recipeDetails);
        updateRecipeLoading(false);
      })
      .catch(err => {
        if (navigator.onLine) {
          if (navigator.onLine) {
            navigate('/server-down', {
              state: {redirectPath: '/'},
            });
          } else {
            navigate('/no-internet', {
              state: {redirectPath: '/'},
            });
          }
        } else {
          updateRecipeLoading(true);
          updateRecipeError(err);
        }
      });
  }, []);

  const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);

  if (recipeLoading) {
    return <Generic.Spinner text={'recipes'} />;
  } else if (recipeDetails) {
    var localRecipeDetails: RecipeDetails = recipeDetails;
    if (
      user &&
      user.favorites !== {} &&
      user.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = user.favorites.recipes;
      localRecipeDetails = {
        ...localRecipeDetails,
        isFavorite: favoriteRecipes.includes(localRecipeDetails._id),
      };
    }
    const {
      _id: recipe_id,
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
      isFavorite,
    } = localRecipeDetails;
    var bookmarkIcon = () => {
      if (isMouseHoveredOnBookmarkButton) {
        return icons.bookmark_hover;
      } else if (isFavorite) {
        return icons.bookmark_selected;
      }
      return icons.bookmark_unselected;
    };
    return (
      <>
        {!isTabletOrMobile && (
          <div className="noselect  border-bottom">
            <Breadcrumb className="noselect mt-3 mx-5">
              {pathDetails.map((pathDetail: any, index: number) => {
                return (
                  <BreadcrumbItem key={index}>
                    <Link to={pathDetail.path}>
                      <strong>
                        {pathDetail.pathName.substring(0, 1).toUpperCase() +
                          pathDetail.pathName.substring(1)}
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
        <div className="noselect container pb-5 px-0 ">
          <div className="noselect px-4 pb-5">
            <h1 className="noselect  col-12 mt-5">{title}</h1>
            <h5 className="noselect text-muted col-12 mb-4">{cuisine}</h5>
            <div className="noselect row">
              <div className="noselect  d-flex flex-wrap col-12 col-md-8 mt-2">
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
              {!isTabletOrMobile && user && user.favorites && (
                <div className="noselect col-12 col-md-4 d-flex justify-content-end align-items-end">
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
            <div className="noselect" style={{position: 'relative'}}>
              <img
                src={imageUrl}
                className="noselect  img-fluid center col-12 my-3"
                alt={title}
                style={{
                  objectFit: 'cover',
                  maxHeight: 1200,
                }}
              />
              {isTabletOrMobile && user && user.favorites && (
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
            <Row>
              <Col className="col-12 col-md-4 ">
                <h3 className="noselect  col-12 mt-5">Ingredients</h3>
                <div className="text-decoration-none">
                  {ingredients &&
                    ingredients.map((ingredient: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="noselect my-3 text-decoration-none list-unstyled">
                          {ingredient}
                        </li>
                      );
                    })}
                </div>
              </Col>
              <div
                className="col-md-1 flex-1 d-flex justify-content-center p-0"
                style={{width: '1px', backgroundColor: 'white'}}>
                <div
                  style={{
                    // flex: 1,
                    width: 20,
                    height: '100%',
                    backgroundColor: '#eee',
                  }}></div>
              </div>
              <Col className="col-12 col-md-7 ps-md-4 ">
                <h3 className="noselect col-12 mt-5">Instructions</h3>
                <ol className="text-decoration-none">
                  {instructions &&
                    instructions.map((instruction: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="noselect text-decoration-none my-3">
                          {instruction}
                        </li>
                      );
                    })}
                </ol>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className="container"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <p>{recipeError}</p>{' '}
      </div>
    );
  }
};

export default RecipeDetailsComponent;
