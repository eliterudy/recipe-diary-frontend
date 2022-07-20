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

const RecipesComponent = (props: any) => {
  const {pathDetails} = props;

  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const locationParams = useLocation();
  const pathSplit = locationParams.pathname.split('/');
  var activePath = pathSplit[pathSplit.length - 1];
  activePath =
    activePath.substring(0, 1).toUpperCase() + activePath.substring(1);
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
    var recipesList = recipeState.recipes;
    if (
      userState &&
      userState.user &&
      userState.user.favorites !== {} &&
      userState.user.favorites.hasOwnProperty('recipes')
    ) {
      const favoriteRecipes = userState.user.favorites.recipes;
      recipesList = recipesList.map((featuredRecipe: RecipeDetails) => {
        return (featuredRecipe = {
          ...featuredRecipe,
          isFavorite: favoriteRecipes.includes(featuredRecipe.id),
        });
      });
    }
    return recipesList;
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
        <div className="noselect row my-4">
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

  var recipesList = getRecipes();

  return (
    <>
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
        {recipeFilters && (
          <div className="noselect  col-12 col-md-3 col-lg-2 border-end px-5 bg-white">
            {getFilters(recipeFilters)}
          </div>
        )}
        <div className="noselect  col-12 col-md-9 col-lg-10 p-0">
          <div
            className="noselect col-12 border-bottom"
            style={{
              padding: 20,
              paddingLeft: 25,
              paddingRight: 40,
              backgroundColor: '#ddd',
            }}>
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
                  height={25}
                  width={25}
                  alt="Search"
                />
              </Button>

              {/* <InputGroupText></InputGroupText> */}
            </InputGroup>
          </div>
          <div className="noselect  col-12  d-flex flex-row flex-wrap pt-5 pe-3">
            {recipesList.map((recipe: RecipeDetails, index: number) => (
              <div
                key={index}
                className={`col-12  col-sm-6 col-lg-4 col-xl-4 mb-5 px-4 `}>
                <Generic.RecipeCard
                  data={recipe}
                  index={index}
                  redirect={`recipeId/${recipe.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesComponent;
