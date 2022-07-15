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
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import Generic from '../generic/Generic';
import {Animate, AnimateGroup} from 'react-simple-animate';
import useIntersection from '../generic/useIntersection';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {icons} from '../../config/configuration';

const RecipesComponent = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const refToSpecialsUsingSmoothScroll =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const [searchHover, updateSearchHover] = useState(false);
  const [recipeFilters, updateFilters] = useState([
    {
      id: 1,
      title: 'Cuisines',
      list: [
        {title: 'Indian', value: false},
        {title: 'Mexican', value: false},
      ],
    },
    {
      id: 2,
      title: 'Courses',
      list: [
        {title: 'Appetizer', value: false},
        {title: 'Lunch', value: false},
        {title: 'Main Course', value: false},
        {title: 'Dinner', value: false},
      ],
    },
  ]);
  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;

  var getRecipes = (): RecipeDetails[] => {
    var featuredRecipes = recipeState.recipes;
    if (
      userState &&
      userState.favorites !== {} &&
      userState.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = userState.favorites.recipes;
      featuredRecipes = featuredRecipes.map((featuredRecipe: RecipeDetails) => {
        return (featuredRecipe = {
          ...featuredRecipe,
          isFavorite: favoriteRecipes.includes(featuredRecipe.id),
        });
      });
    }
    return featuredRecipes;
  };

  var addFiltersToList = (
    filterIndex: number,
    listIndex: number,
    value: any,
  ) => {
    console.log(filterIndex, value);
    // console.log(recipeFilters.hasOwnProperty(key));
    const temp = [...recipeFilters];
    temp[filterIndex].list[listIndex] = value;
    updateFilters(temp);
  };

  var getFilters = (recipeFilters: any) => {
    const results = recipeFilters.map((data: any, filterIndex: any) => {
      var key = data.id;
      var title = data.title;
      var list = data.list;

      return (
        <div className="row my-5">
          <strong>{title}</strong>
          {list.map((filterDataElement: any, listIndex: number) => {
            return (
              <div className="pt-2">
                <Generic.Checkbox
                  key={listIndex}
                  label={filterDataElement.title}
                  value={filterDataElement.value}
                  onChange={() =>
                    addFiltersToList(filterIndex, listIndex, {
                      ...filterDataElement,
                      value: !filterDataElement.value,
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      );
    });
    return results;
  };

  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };
  var featuredRecipes = getRecipes();

  return (
    <>
      <div className=" row border-bottom  p-2">
        <div className=" offset-sm-3 col-12 col-sm-6 ">
          <InputGroup>
            <Input
              placeholder="Search recipes..."
              style={{borderColor: '#eee'}}
            />
            <Button
              outline
              onClick={() => {}}
              onMouseEnter={() => updateSearchHover(true)}
              onMouseLeave={() => updateSearchHover(false)}
              style={{
                borderColor: '#eee',
                backgroundColor: searchHover ? '#1976D2' : 'white',
              }}>
              <img
                className="col-auto"
                src={searchHover ? icons.search_white : icons.search_black}
                height={30}
                width={30}
                alt="Search"
              />
            </Button>

            {/* <InputGroupText></InputGroupText> */}
          </InputGroup>
        </div>
      </div>
      <div className="row">
        {recipeFilters && (
          <div className=" col-12 col-md-2 border-end px-5 bg-white">
            {getFilters(recipeFilters)}
          </div>
        )}
        <div className=" col-12 col-md-10 d-flex flex-row flex-wrap pt-5">
          {featuredRecipes.map((recipe: RecipeDetails, index: number) => (
            <div
              key={index}
              className={`col-12  col-sm-6 col-md-4 col-lg-4 mb-5 px-4 `}>
              <Generic.RecipeCard
                data={recipe}
                index={index}
                redirect={`/recipes/${recipe.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipesComponent;
