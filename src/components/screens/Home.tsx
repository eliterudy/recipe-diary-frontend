import React, {useState, useRef, useEffect} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import Generic from '../generic/Generic';
import {Animate, AnimateGroup} from 'react-simple-animate';
import useIntersection from '../generic/useIntersection';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeListElement} from '../../config/types';
import {useNavigate} from 'react-router-dom';
import reduxApiCallers from '../../redux/thunks/reduxApiCallers';
import apis from '../../config/api';
import {images} from '../../config/configuration';
import {useMediaQuery} from 'react-responsive';
import {homeCards, homeCards2} from '../../config/dataset';
import classNames from 'classnames';

const HomeComponent = (props: any) => {
  const {pathDetails} = props;
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: any) => {
    return {
      userState: state.userActionReducer,
      recipeState: state.recipeActionReducer,
    };
  });
  const {userState, recipeState} = state;
  const {user} = userState;
  const [recipes, updateRecipes] = useState<null | RecipeListElement[]>(null);
  const [recipeLoading, updateRecipesLoading] = useState(false);
  const [recipeError, updateRecipesError] = useState(null);
  useEffect(() => {
    updateRecipesLoading(true);
    apis
      .getAllRecipes({featured: true})
      .then(async ({data}) => {
        var recipes = data.results;

        await updateRecipes(recipes);
        updateRecipesLoading(false);
      })
      .catch(err => {
        if (err && err.message && err.message === 'Network Error') {
          if (navigator.onLine) {
            navigate('/server-down', {state: {redirectPath: '/'}});
          } else {
            navigate('/no-internet', {state: {redirectPath: '/'}});
          }
        } else {
          updateRecipesError(err.message);
          updateRecipesLoading(false);
        }
      });
  }, []);

  const refToAnimateUsingViewport =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const refToSpecialsUsingSmoothScroll =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const inViewport = useIntersection(refToAnimateUsingViewport, '0px'); // Trigger as soon as the element becomes visible
  const [showSpecials, updateShowSpecials] = useState(false);

  if (!inViewport && showSpecials === false) {
    updateShowSpecials(true);
  }

  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const loadRecipes = (localRecipes: RecipeListElement[] | null) => {
    if (recipeLoading) {
      return <Generic.Spinner text={'recipes'} />;
    } else if (!recipeLoading && localRecipes) {
      return localRecipes.map((special: RecipeListElement, index: number) => (
        <div key={index} className={`col-12  col-sm-6 col-lg-4 px-3 mb-3 `}>
          {/* <Animate
            play={showSpecials}
            start={{opacity: 0, marginTop: 100}}
            end={{opacity: 1, marginTop: 0}}
            duration={0.5}
            sequenceIndex={index}> */}
          <Generic.RecipeCard
            data={special}
            index={index}
            redirect={`/main/home/recipeId/${special._id}`}
          />
          {/* </Animate> */}
        </div>
      ));
    } else {
      return (
        <div
          className="container"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <p>
            {
              'Oops! Looks like something went wrong. Please refresh the page so we can try and fetch the information you are looking for.'
            }
          </p>
        </div>
      );
    }
  };

  var localRecipes = recipes;
  if (
    user &&
    user.favorites !== {} &&
    user.favorites.hasOwnProperty('recipes')
  ) {
    const favoriteRecipes = user.favorites.recipes;
    localRecipes =
      localRecipes &&
      localRecipes.map((recipe: RecipeListElement) => {
        return (recipe = {
          ...recipe,
          isFavorite: favoriteRecipes.includes(recipe._id),
        });
      });
  }

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 576px)'});

  const renderHomeCard = (home: any, index: number) => {
    return (
      <div key={index} className="flex-1 col-12 col-sm-6 col-lg-3 p-3">
        <Generic.InfoCard cardProps={home} />
      </div>
    );
  };

  return (
    <>
      <div
        id="intro"
        style={{
          backgroundImage: `url(${images.food_background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
        }}
        className="noselect bg-image shadow-5-strong col-12">
        <div
          className="noselect mask  col-12"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.85)', height: '80vh'}}>
          <div className="noselect container d-flex align-items-center justify-content-center text-center h-100">
            <div className="noselect text-white">
              <h1
                className="noselect mb-3"
                style={{
                  fontFamily: 'Kaushan Script',
                  fontWeight: 400,
                  fontSize: 46,
                }}>
                Learn Healthy and Tasty Recipes
              </h1>
              <h5 className="noselect mb-4">Classic Recipes for Home Cooks</h5>

              <div
                className="noselect btn btn-outline-light btn-lg m-2"
                onClick={() => navigate('/main/recipes')}>
                Explore Recipes
              </div>
              <div
                className="noselect btn btn-outline-light btn-lg m-2"
                onClick={() => scrollTo(refToSpecialsUsingSmoothScroll)}>
                Today's specials
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container  d-flex justify-content-center ">
        <div className="d-flex flex-wrap my-5 col-lg-12">
          {homeCards.map((home, index) => renderHomeCard(home, index))}
        </div>
      </div>
      <div className="m-0 " style={{backgroundColor: '#ede'}}>
        {/* Purple view for large screens */}
        <div className="container  py-5 d-none d-lg-flex ">
          <div className="d-flex flex-column justify-content-between align-items-start  col-sm-4 col-lg-3 py-5">
            <p className="pb-1 ps-3 p-0 position-relative m-0">
              <p className="h1 fw-bold"> {homeCards2[0].title}</p>
              <p className="m-0" style={{width: '150%'}}>
                {homeCards2[0].description}
              </p>
            </p>
            <p className="pt-1 ps-3 p-0 position-relative">
              <p className="h1 fw-bold" style={{width: '150%'}}>
                {homeCards2[1].title}
              </p>
              <p className="m-0" style={{width: '150%'}}>
                {homeCards2[1].description}
              </p>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center col-sm-4 col-lg-6">
            <img
              className="img-fluid d-none d-lg-block"
              src={require('../../assets/images/center-food.png')}
              alt="center"
            />
          </div>
          <div className="d-flex flex-column justify-content-between align-items-end col-sm-4 col-lg-3 py-5 ">
            <p className="text-end pb-1 pe-3 p-0 position-relative m-0">
              <p
                className="h1 fw-bold"
                style={{width: '150%', transform: 'translate(-35%, 0%'}}>
                {homeCards2[2].title}
              </p>
              <p
                className="m-0"
                style={{width: '130%', transform: 'translate(-25%, 0%'}}>
                {homeCards2[2].description}
              </p>
            </p>
            <p className="text-end pt-1 pe-3 p-0 position-relative m-0">
              <p
                className="h1 fw-bold"
                style={{width: '150%', transform: 'translate(-35%, 0%'}}>
                {homeCards2[3].title}
              </p>
              <p
                className="m-0"
                style={{width: '140%', transform: 'translate(-30%, 0%'}}>
                {homeCards2[3].description}
              </p>
            </p>
          </div>
        </div>
        {/* Purple view for small screens */}
        <div className="container px-3 py-5 d-flex flex-column align-items-center d-lg-none">
          {homeCards2.map((elem: any, index: number) => {
            return (
              <div
                className={classNames(
                  'col-12 py-4 px-2 px-sm-0 py-sm-2 d-block d-sm-flex ',
                )}
                style={{
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                }}>
                <img
                  src={elem.image}
                  alt="i"
                  className="col-12 col-sm-4 col-md-3 img-fluid"
                  style={{
                    borderRadius: '50%',
                    aspectRatio: '1',
                    padding: 10,
                    backgroundColor: 'white',
                  }}
                />
                <div className="col-12 col-sm-8 col-md-9 p-3 p-0 position-relative m-0 d-flex flex-column justify-content-center ">
                  <p
                    className={classNames(
                      'h1 fw-bold text-center',
                      index % 2 === 0 ? 'text-sm-start' : 'text-sm-end',
                    )}>
                    {elem.title}
                  </p>
                  <p
                    className={classNames(
                      'm-0  text-center text-center',
                      index % 2 == 0 ? 'text-sm-start' : 'text-sm-end',
                    )}>
                    {elem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="row col-12 pt-5 m-0" style={{backgroundColor: '#eee'}}>
        <div className="col col-12 col-sm-4 px-sm-5 position-relative">
          <p
            className={
              isTabletOrMobile ? 'position-relative' : '  position-absolute'
            }
            style={{
              width: isTabletOrMobile ? '100%' : '150%',
              top: '50%',
              transform: isTabletOrMobile
                ? 'translate(0%, -10%)'
                : 'translate(0%, -60%)',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textAlign: 'center',
              fontSize: isTabletOrMobile ? 20 : '2.5cqw',
            }}>
            The joy of cooking for others is one of life's greatest pleasures.
            Take pride in creating a meal that brings people together.
          </p>
        </div>
        <div className=" col col-sm-8 m-0">
          <img
            className="img-fluid w-100 m-0 "
            src={
              isTabletOrMobile
                ? 'https://pngimg.com/d/chef_PNG211.png'
                : 'https://pngimg.com/d/chef_PNG196.png'
            }
          />
        </div>
      </div> */}

      <div className="noselect container pt-5">
        <h1
          className="noselect text-center mb-5"
          ref={refToSpecialsUsingSmoothScroll}>
          Todays Specials
        </h1>
        <div
          className="noselect d-flex flex-row flex-wrap"
          ref={refToAnimateUsingViewport}>
          {/* <AnimateGroup play={showSpecials}> */}
          {loadRecipes(localRecipes)}
          {/* </AnimateGroup> */}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
