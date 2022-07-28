import React, {useState, useRef, useEffect, ReactElement} from 'react';
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
import {RecipeListElement, RecipeFilters} from '../../config/types';
import {icons} from '../../config/configuration';
import {useMediaQuery} from 'react-responsive';
import {useLocation, Link} from 'react-router-dom';
import actionReducers from '../../redux/actionReducers/index';
import apis from '../../config/api';
import api from '../../config/api';
const {updateRecipeFilters, updateSelectedFilters} = actionReducers;
const RecipesComponent = (props: any) => {
  const {pathDetails} = props;

  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 820px)'});
  const locationParams = useLocation();
  const pathSplit = locationParams.pathname.split('/');
  var activePath = pathSplit[pathSplit.length - 1];
  activePath =
    activePath.substring(0, 1).toUpperCase() + activePath.substring(1);

  const state = useSelector((state: any) => {
    return {
      recipeState: state.recipeActionReducer,
      userState: state.userActionReducer,
    };
  });
  const {recipeState, userState} = state;
  const {user} = userState;
  const {recipeFilters, selectedFilters} = recipeState;
  const limit = 9;

  /* Local states */
  const [searchHover, updateSearchHover] = useState(false);
  const [offset, updateOffset] = useState(0);
  const [search, updateSearch] = useState('');
  const [recipes, updateRecipes] = useState<null | RecipeListElement[]>();
  const [recipeLoading, updateRecipesLoading] = useState(false);
  const [recipeError, updateRecipesError] = useState(null);
  // const [recipeFilters, updateRecipeFilters] = useState<RecipeFilters>({});
  // const [selectedFilters, updateSelectedFilters] = useState<RecipeFilters>({});
  useEffect(() => {
    api
      .getRecipeFilters()
      .then(({data}: {data: RecipeFilters}) => {
        var dict = {} as RecipeFilters;
        dispatch(updateRecipeFilters(data));
        Object.entries(data).map(
          ([key, value]: [key: string, value: string[]], objectKeyIndex) => {
            dict[key as keyof typeof data] = [];
          },
        );
        dispatch(updateSelectedFilters(dict));
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    getRecipesFromApi();
  }, [search, selectedFilters]);

  var getRecipesFromApi = () => {
    updateRecipesLoading(true);
    updateRecipes(null);
    setTimeout(() => {
      apis
        .getAllRecipes({
          search,
          limit,
          offset,
          cuisine: JSON.stringify(selectedFilters.cuisine),
          course: JSON.stringify(selectedFilters.course),
        })
        .then(async ({data}) => {
          var recipes = data.results;

          if (
            user &&
            user.favorites !== {} &&
            user.favorites.hasOwnProperty('recipes')
          ) {
            const favoriteRecipes = user.favorites.recipes;
            recipes = recipes.map((recipe: RecipeListElement) => {
              return (recipe = {
                ...recipe,
                isFavorite: favoriteRecipes.includes(recipe._id),
              });
            });
          }

          await updateRecipes(recipes);
          updateRecipesLoading(false);
        })
        .catch((error: any) => {
          updateRecipesError(error);
          updateRecipesLoading(false);
        });
    }, 1000);
  };

  var getFilters = (filters: RecipeFilters) => {
    return Object.entries(filters).map(
      ([key, value]: [key: string, value: string[]], objectKeyIndex) => {
        var title = key.toLocaleUpperCase();
        var list = value as string[];

        return (
          <div className="noselect row my-4" key={objectKeyIndex}>
            <strong>{title}</strong>
            {list.map((filterDataElement: any, listIndex: number) => {
              return (
                <div className="noselect pt-2" key={listIndex}>
                  <Generic.Checkbox
                    key={listIndex}
                    label={filterDataElement}
                    value={(
                      selectedFilters[key as keyof typeof filters] as string[]
                    ).includes(filterDataElement)}
                    onChange={() => {
                      console.log('here');

                      var dict = {...selectedFilters} as RecipeFilters;
                      var tempArr = [
                        ...(dict[key as keyof typeof filters] as string[]),
                      ];
                      if (tempArr.includes(filterDataElement)) {
                        tempArr.splice(tempArr.indexOf(filterDataElement), 1);
                      } else {
                        tempArr.push(filterDataElement);
                      }
                      dict[key as keyof typeof filters] = [...tempArr];
                      dispatch(updateSelectedFilters(dict));
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      },
    );
  };

  const loadRecipes = () => {
    if (recipeLoading) {
      return <Generic.Spinner text={'recipes'} />;
    } else if (!recipeLoading && recipes) {
      return recipes.map((recipe: RecipeListElement, index: number) => (
        <div
          key={index}
          className={`col-12  col-sm-6 col-lg-4 col-xl-4 mb-5 px-4 `}>
          <Generic.RecipeCard
            data={recipe}
            index={index}
            redirect={`recipeId/${recipe._id}`}
          />
        </div>
      ));
    } else {
      return <Generic.ListError error={recipeError} />;
    }
  };
  return (
    <div className="d-flex h-100 flex-column">
      {!isTabletOrMobile && (
        <div className="noselect  border-bottom">
          <Breadcrumb className="noselect mt-3 mx-5">
            {pathDetails &&
              pathDetails.map((pathDetail: any, index: number) => (
                <BreadcrumbItem key={index}>
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

      <div className="noselect row flex-grow-1">
        {recipeFilters && (
          <div className="noselect  col-12 col-md-3 col-lg-2 border-end ps-5 pe-auto bg-white">
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
                value={search}
                onChange={async e => {
                  await updateSearch(e.target.value);
                  await updateOffset(0);
                }}
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
          <div className="noselect  col-12 flex-grow-1  d-flex flex-row flex-wrap pt-5 pe-3">
            {loadRecipes()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesComponent;
