import React, {useState, useRef, useEffect} from 'react';
import {
  Input,
  InputGroup,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap';
import Generic from '../generic/Generic';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {icons} from '../../config/configuration';
import {useMediaQuery} from 'react-responsive';
import {useLocation, Link} from 'react-router-dom';

const RecipesComponent = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const locationParams = useLocation();
  const pathSplit = locationParams.pathname.split('/');
  const activePath = pathSplit[pathSplit.length - 1];
  // console.log(locationParams);
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

  var addFiltersToList = (
    filterIndex: number,
    listIndex: number,
    value: any,
  ) => {
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
        <div className="noselect row my-5">
          <strong>{title}</strong>
          {list.map((filterDataElement: any, listIndex: number) => {
            return (
              <div className="noselect pt-2" key={listIndex}>
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

  var featuredRecipes = getRecipes();

  return (
    <>
      {!isTabletOrMobile && (
        <div className="noselect ">
          <Breadcrumb
            className="noselect mt-2 mx-5"
            style={{backgroundColor: 'white'}}>
            <BreadcrumbItem>
              <Link to={'/home'}>
                <strong>Home</strong>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <strong>
                {activePath.substring(0, 1).toUpperCase() +
                  activePath.substring(1)}
              </strong>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      )}
      <div className="noselect  row border-bottom  p-2">
        <div className="noselect  offset-sm-3 col-12 col-sm-6 ">
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
                className="noselect col-auto"
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
      <div className="noselect row">
        {recipeFilters && (
          <div className="noselect  col-12 col-md-3 col-lg-2 border-end px-5 bg-white">
            {getFilters(recipeFilters)}
          </div>
        )}
        <div className="noselect  col-12 col-md-9 col-lg-10 d-flex flex-row flex-wrap pt-5 pe-4">
          {featuredRecipes.map((recipe: RecipeDetails, index: number) => (
            <div
              key={index}
              className={`col-12  col-sm-6 col-lg-4 col-xl-3 mb-5 px-4 `}>
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
