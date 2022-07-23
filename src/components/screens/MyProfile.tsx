import React, {useState, useRef, useEffect} from 'react';
import {
  Input,
  InputGroup,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  TabPane,
  TabContent,
} from 'reactstrap';
import Generic from '../generic/Generic';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {icons} from '../../config/configuration';
import {useMediaQuery} from 'react-responsive';
import {useLocation, Link, useNavigate} from 'react-router-dom';
import {Avatar, AvatarGroup} from '@chakra-ui/avatar';
import {randomColorGenerator} from '../../config/configuration';
import {cssHover} from '../generic/hoverProps';
import classnames from 'classnames';
import actions from '../../redux/actionReducers/index';

const {verifyUser} = actions;

const avatarColor = randomColorGenerator();

const MyProfileComponent = (props: any) => {
  const {pathDetails} = props;
  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  let locationParams = useLocation();
  const {recipeState, userState} = state;
  const {user} = userState;
  const navigate = useNavigate();

  useEffect(() => {
    if (locationParams.pathname === '/my-profile' && !user) {
      navigate('/home');
    }
  });
  const [activeTab, updateActiveTab] = useState(0);
  const tabs = ['Recently Viewed', 'My Recipes', 'Saved Recipes'];
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const pathSplit = locationParams.pathname.split('/');
  const activePath = pathSplit[pathSplit.length - 1]
    .split('-')
    .map(elem => elem.substring(0, 1).toUpperCase() + elem.substring(1))
    .join(' ');

  const verifyCardHoverStyle = cssHover(
    {
      transform: 'scale(1.05)',
      zIndex: 10,
      transition: '0.5s',
    },
    {transition: '0.3s'},
    {
      flex: 1,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#774360',
      borderRadius: 8,
    },
  );
  const getVerifiedButtonStyle = cssHover(
    {
      border: '1px solid #2b72a1',
      boxShadow: '0px 0px 1px 2px rgba(231, 171, 121, 1)',
      backgroundColor: '#B25068',
    },
    {
      border: '0px solid #2b72a1',
      backgroundColor: '#B25068',
    },
    {
      cursor: 'pointer',
      color: '#ECDBBA',
    },
  );
  const editProfileButtonStyle = cssHover(
    {
      border: '1px solid #2b72a1',
      boxShadow: '0px 0px 1px 2px rgba(43, 114, 161, 0.6)',
      color: '#2b72a1',
    },
    {
      border: '1px solid #2b59a1',
      color: '#2b59a1',
    },
    {
      cursor: 'pointer',
      backgroundColor: 'white',
    },
  );

  var getRecipes = (userProp: string): RecipeDetails[] => {
    var results: RecipeDetails[] = [];
    var allRecipes = recipeState.recipes;
    if (
      user &&
      user[userProp] !== {} &&
      user[userProp].hasOwnProperty('recipes')
    ) {
      const recipeListForUserProp = user[userProp].recipes;
      results = recipeListForUserProp.map((elem: string) => {
        var recipe = allRecipes.filter((e: RecipeDetails) => e.id === elem)[0];
        recipe = {...recipe, isFavorite: false};
        if (
          user &&
          user['favorites'] !== {} &&
          user['favorites'].hasOwnProperty('recipes')
        ) {
          var favRecipeList = user.favorites.recipes;
          recipe = {
            ...recipe,
            isFavorite: favRecipeList.includes(recipe.id),
          };

          return recipe;
        }
      });
    }
    return results.reverse();
  };

  var getMyRecipes = (userId: any) => {
    var results = recipeState.recipes;
    if (recipeState.recipes) {
      // results = recipeState.recipes.filter(
      //   (recipe: RecipeDetails) => recipe.author._id === userId,
      // );
    }

    return results;
  };

  var loadRecipes = (recipes: RecipeDetails[], recipeType: string) => {
    var response;
    if (recipes && recipes.length > 0) {
      if (recipeType === 'recents' && recipes.length > 10) {
        recipes = recipes.slice(0, 10);
      }
      response = (
        <div>
          {recipeType === 'recents' && (
            <em>
              <small className="ps-4 mb-0 pb-0 text-muted">
                Top {recipes.length > 10 ? 10 : recipes.length} recipes you
                recently checked out...
              </small>
            </em>
          )}

          <div className="noselect  col-12  d-flex flex-row flex-wrap pt-4 pe-3">
            {recipes.map((recipe: RecipeDetails, index: number) => (
              <div
                key={index}
                className={`col-12  col-md-6 col-lg-6 col-xl-4 mb-5 px-4 `}>
                <Generic.RecipeCard
                  data={recipe}
                  index={index}
                  redirect={`recipeId/${recipe.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      response = (
        <div className="noselect  col-12  d-flex flex-row flex-wrap pt-5 pe-3">
          <span className="col-12 text-center">
            {`No ${recipeType} recipes`}
          </span>
        </div>
      );
    }

    return response;
  };

  var savedRecipes = getRecipes('favorites');
  var recentRecipes = getRecipes('recents');
  var myrecipes = getMyRecipes(user._id);

  return (
    <>
      {user && (
        <div>
          {!isTabletOrMobile && (
            <div className="noselect  border-bottom">
              <Breadcrumb className="noselect mt-3 mx-5">
                {pathDetails &&
                  pathDetails.map((pathDetail: any) => (
                    <BreadcrumbItem>
                      <Link to={pathDetail.path}>
                        <strong>{pathDetail.pathName}</strong>
                      </Link>
                    </BreadcrumbItem>
                  ))}
                <BreadcrumbItem active>
                  <strong>{activePath}</strong>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          )}
          <div className="noselect row">
            <div className="noselect  col-12 col-md-4 col-xl-3 border-end  px-5 bg-white ">
              <div
                className="d-flex flex-column align-items-center pt-5"
                style={{marginBottom: 600}}>
                <div
                  className=""
                  style={{
                    backgroundColor: avatarColor,
                    borderRadius: 100,
                    width: 150,
                    height: 150,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Avatar
                    className=""
                    style={{fontSize: 50, color: 'white'}}
                    name={user.fullname}
                  />
                </div>
                <h4
                  style={{
                    padding: 10,
                    overflowWrap: 'break-word',
                  }}>{`${user.firstname} ${user.lastname}`}</h4>
                <Button
                  className="col-12 mb-5"
                  {...editProfileButtonStyle}
                  outline>
                  Edit Profile
                </Button>
                <Col className="col-12 ">
                  {!user.isVerified && (
                    <div className="py-4" {...verifyCardHoverStyle}>
                      <p style={{color: '#ECDBBA', marginBottom: 20}}>
                        If you love cooking like we do and wish to contribute to
                        our website with you marvelous recipes, click on the
                        link below to become a verified contributor
                      </p>
                      <Button
                        {...getVerifiedButtonStyle}
                        className="col-12 "
                        onClick={() => {
                          dispatch(verifyUser(true));
                        }}>
                        <span>Get Verified</span>
                      </Button>
                    </div>
                  )}
                </Col>
              </div>
            </div>
            <div className="noselect  col-12 col-md-8 col-xl-9  p-2">
              <Nav tabs className="m-2">
                {tabs &&
                  tabs.map((tab, index) => {
                    if (tab === 'My Recipes' && !user.isVerified) {
                      return null;
                    }
                    return (
                      <NavItem>
                        <NavLink
                          className={classnames({active: activeTab === index})}
                          onClick={() => {
                            updateActiveTab(index);
                          }}>
                          <span className="px-3">{tab}</span>
                        </NavLink>
                      </NavItem>
                    );
                  })}
              </Nav>
              <TabContent activeTab={activeTab} className="m-3">
                <TabPane tabId={0}>
                  {loadRecipes(recentRecipes, 'recents')}
                </TabPane>
                <TabPane tabId={1}>
                  <Col>
                    <Button color="success" className="ms-4 ps-3 pe-3">
                      + New Recipe
                    </Button>
                  </Col>
                  {loadRecipes(myrecipes, 'myrecipes')}
                </TabPane>
                <TabPane tabId={2}>
                  {loadRecipes(savedRecipes, 'favorites')}
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfileComponent;
