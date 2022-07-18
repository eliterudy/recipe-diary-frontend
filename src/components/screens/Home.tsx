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
import {RecipeDetails} from '../../config/types';
import {useNavigate} from 'react-router-dom';

const HomeComponent = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const refToAnimateUsingViewport =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const refToSpecialsUsingSmoothScroll =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const inViewport = useIntersection(refToAnimateUsingViewport, '0px'); // Trigger as soon as the element becomes visible
  const [showSpecials, updateShowSpecials] = useState(false);

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;

  var getspecials = (): RecipeDetails[] => {
    var featuredRecipes = recipeState.recipes.filter(
      (recipe: RecipeDetails) => recipe.featured === true,
    );
    if (
      userState &&
      userState.user &&
      userState.user.favorites !== {} &&
      userState.user.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = userState.user.favorites.recipes;
      featuredRecipes = featuredRecipes.map((featuredRecipe: RecipeDetails) => {
        return (featuredRecipe = {
          ...featuredRecipe,
          isFavorite: favoriteRecipes.includes(featuredRecipe.id),
        });
      });
    }
    return featuredRecipes;
  };

  if (inViewport && showSpecials === false) {
    updateShowSpecials(true);
  }

  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };
  var featuredRecipes = getspecials();

  return (
    <>
      <div
        id="intro"
        style={{
          backgroundImage: 'url(../../assets/images/food-background-1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="noselect bg-image shadow-5-strong vh-100 vw-100">
        <div
          className="noselect mask vh-100 vw-100"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.85)'}}>
          <div className="noselect container d-flex align-items-center justify-content-center text-center h-100">
            <div className="noselect text-white">
              <h1 className="noselect mb-3">Learn Healthy and Tasty Recipes</h1>
              <h5 className="noselect mb-4">
                Easy & Professional Indian recipes
              </h5>
              <div
                className="noselect btn btn-outline-light btn-lg m-2"
                onClick={() => navigate('/recipes')}>
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
      <div
        className="noselect container pt-5"
        ref={refToSpecialsUsingSmoothScroll}>
        <h1 className="noselect text-center mb-5">Todays Specials</h1>
        <div
          className="noselect d-flex flex-row flex-wrap"
          ref={refToAnimateUsingViewport}>
          {/* <AnimateGroup play={showSpecials}> */}
          {featuredRecipes.map((special: RecipeDetails, index: number) => (
            <div key={index} className={`col-12  col-sm-6 col-lg-4 mb-5 px-4 `}>
              <Animate
                play={showSpecials}
                start={{opacity: 0, marginTop: 100}}
                end={{opacity: 1, marginTop: 0}}
                duration={1}
                sequenceIndex={index}>
                <Generic.RecipeCard
                  data={special}
                  index={index}
                  redirect={`/home/${special.id}`}
                />
              </Animate>
            </div>
          ))}
          {/* </AnimateGroup> */}
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
