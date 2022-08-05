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
        <div key={index} className={`col-12  col-sm-6 col-lg-4 mb-5 px-3 `}>
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
          <p>{recipeError}</p>
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
  return (
    <>
      <div
        id="intro"
        style={{
          backgroundImage: `url(${images.food_background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="noselect bg-image shadow-5-strong vh-100 col-12">
        <div
          className="noselect mask vh-100 col-12"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.85)'}}>
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
                Explore
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
