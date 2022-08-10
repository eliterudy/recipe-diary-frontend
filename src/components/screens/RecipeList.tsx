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
import {useLocation, Link, useNavigate} from 'react-router-dom';
import actionReducers from '../../redux/actionReducers/index';
import apis from '../../config/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import {DebounceInput} from 'react-debounce-input';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const RecipesComponent = (props: any) => {
  const {pathDetails} = props;
  const navigate = useNavigate();
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
  // const {recipeFilters, selectedFilters} = recipeState;
  const limit = 9;

  /* Local states */
  const [searchHover, updateSearchHover] = useState(false);
  const [offset, updateOffset] = useState(0);
  const [search, updateSearch] = useState('');
  const [recipes, updateRecipes] = useState<null | RecipeListElement[]>(null);
  const [recipeLoading, updateRecipesLoading] = useState(false);
  const [recipeError, updateRecipesError] = useState(null);
  const [recipeFilters, updateRecipeFilters] = useState<RecipeFilters>({});
  const [selectedFilters, updateSelectedFilters] = useState<RecipeFilters>({});
  const [isFiltersLoaded, updateFilterLoadStatus] = useState(false);
  const [recipeCount, updateRecipeCount] = useState(0);
  const [callerCounter, updateCallerCounter] = useState(0);

  // window.onbeforeunload = function () {
  //   window.sessionStorage.removeItem('selectedFilters');
  //   return '';
  // };

  useEffect(() => {
    apis
      .getRecipeFilters()
      .then(async ({data}: {data: RecipeFilters}) => {
        var dict = {} as RecipeFilters;
        updateRecipeFilters(data);
        var selectedSaved = window.sessionStorage.getItem('selectedFilters');
        Object.entries(data).map(
          ([key, value]: [key: string, value: string[]], objectKeyIndex) => {
            dict[key as keyof typeof data] = [];
          },
        );

        updateSelectedFilters(
          (selectedSaved && JSON.parse(selectedSaved)) || dict,
        );
        updateFilterLoadStatus(true);
        updateCallerCounter(callerCounter + 1);
        window.sessionStorage.setItem('selectedFilters', JSON.stringify(dict));
      })
      .catch(err => {
        if (err && err.message && err.message === 'Network Error') {
          if (navigator.onLine) {
            if (navigator.onLine) {
              navigate('/server-down', {
                state: {redirectPath: '/main/recipes/'},
              });
            } else {
              navigate('/no-internet', {
                state: {redirectPath: '/main/recipes/'},
              });
            }
          } else {
            alert(
              'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
            );
          }
        }
      });
  }, []);

  useEffect(() => {
    if (isFiltersLoaded) {
      getRecipesFromApi();
    }
  }, [callerCounter]);

  var getRecipesFromApi = () => {
    updateRecipesLoading(true);

    apis
      .getAllRecipes({
        search,
        limit,
        offset,
        cuisine: JSON.stringify(selectedFilters.cuisine),
        course: JSON.stringify(selectedFilters.course),
        diet: JSON.stringify(selectedFilters.diet),
      })
      .then(async ({data}) => {
        var tempRecipes = data.results;

        if (
          user &&
          user.favorites !== {} &&
          user.favorites.hasOwnProperty('recipes')
        ) {
          const favoriteRecipes = user.favorites.recipes;
          tempRecipes = tempRecipes.map((recipe: RecipeListElement) => {
            return (recipe = {
              ...recipe,
              isFavorite: favoriteRecipes.includes(recipe._id),
            });
          });
        }
        updateRecipeCount(data.count);
        updateOffset(data.nextOffset);

        if (recipes) {
          updateRecipes([...recipes, ...tempRecipes]);
        } else {
          updateRecipes([...tempRecipes]);
        }
        updateRecipesLoading(false);
      })

      .catch(err => {
        if (err && err.message && err.message === 'Network Error') {
          if (navigator.onLine) {
            if (navigator.onLine) {
              navigate('/server-down', {
                state: {redirectPath: '/main/recipes/'},
              });
            } else {
              navigate('/no-internet', {
                state: {redirectPath: '/main/recipes/'},
              });
            }
          } else {
            alert(
              'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
            );
          }
        } else {
          updateRecipesError(err);
          updateRecipesLoading(false);
        }
      });
  };

  var loadFilters = (filters: RecipeFilters) => {
    return Object.entries(filters).map(
      ([key, value]: [key: string, value: string[]], objectKeyIndex) => {
        var title = key.toLocaleUpperCase();
        var list = value as string[];

        return (
          <AccordionItem uuid={objectKeyIndex}>
            <AccordionItemHeading>
              <AccordionItemButton style={{backgroundColor: '#eee'}}>
                <strong>{title}</strong>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className=" p-3 pt-0">
              <div className="noselect row" key={objectKeyIndex}>
                {list.map((filterDataElement: any, listIndex: number) => {
                  return (
                    <div className="noselect pt-2" key={listIndex}>
                      <Generic.Checkbox
                        key={listIndex}
                        label={filterDataElement}
                        value={(
                          selectedFilters[
                            key as keyof typeof filters
                          ] as string[]
                        ).includes(filterDataElement)}
                        onChange={async () => {
                          var dict = {...selectedFilters} as RecipeFilters;
                          var tempArr = [
                            ...(dict[key as keyof typeof filters] as string[]),
                          ];
                          if (tempArr.includes(filterDataElement)) {
                            tempArr.splice(
                              tempArr.indexOf(filterDataElement),
                              1,
                            );
                          } else {
                            tempArr.push(filterDataElement);
                          }
                          dict[key as keyof typeof filters] = [...tempArr];
                          await updateOffset(0);
                          await updateRecipes(null);
                          await updateRecipesLoading(true);
                          await updateSelectedFilters(dict);
                          await updateCallerCounter(callerCounter + 1);

                          window.sessionStorage.setItem(
                            'selectedFilters',
                            JSON.stringify(dict),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        );
      },
    );
  };

  const loadRecipes = (localRecipes: RecipeListElement[]) => {
    if (recipeLoading) {
      return <Generic.Spinner text={'recipes'} />;
    } else if (!recipeLoading && localRecipes) {
      return localRecipes.map((recipe: RecipeListElement, index: number) => (
        <div
          key={index}
          className={`col-12 col-sm-6 col-lg-4 col-xl-4 mb-5 px-3 `}>
          <Generic.RecipeCard
            data={recipe}
            index={index}
            redirect={`/main/recipes/recipeId/${recipe._id}`}
          />
        </div>
      ));
    } else {
      return <Generic.ListError error={recipeError} />;
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
    <div className="d-flex h-100 flex-column col-12">
      {!isTabletOrMobile && (
        <div className="noselect  border-bottom col-12">
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

      <div className="noselect row col-12 m-0 p-0">
        {recipeFilters && (
          <div className="noselect  col-12 col-sm-3 col-lg-2 border-end bg-white p-0">
            <Accordion preExpanded={[0]} allowZeroExpanded>
              {loadFilters(recipeFilters)}
            </Accordion>
          </div>
        )}
        <div className="noselect  col-12 col-sm-9 col-lg-10 m-0 p-0">
          <div
            className="noselect col-12 border-bottom"
            style={{
              padding: 10,
              paddingTop: 8,
              paddingBottom: 8,
              backgroundColor: '#eee',
            }}>
            <InputGroup className="col-12">
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                style={{
                  borderColor: '#fff',
                  border: '0px',
                  borderRadius: 8,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,

                  flex: 1,
                  padding: 10,
                }}
                placeholder="Search recipes..."
                onChange={async (e: any) => {
                  updateOffset(0);
                  updateRecipes(null);
                  updateRecipesLoading(true);
                  await updateSearch(e.target.value);
                  await updateCallerCounter(callerCounter + 1);
                }}
              />
              <Button
                outline
                onClick={async () => {
                  updateOffset(0);
                  updateRecipes(null);
                  updateRecipesLoading(true);
                  await updateCallerCounter(callerCounter + 1);
                }}
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
          <div className="noselect  col-12   pt-1 px-3">
            {recipes && (
              <div>
                <div className="d-flex flex-column align-items-end pt-3">
                  <em
                    className="px-2 pt-1  me-3"
                    style={{
                      border: '0.5px solid #ddd',
                      backgroundColor: '#eee',
                      borderRadius: 3,
                    }}>
                    Showing: {recipes.length} of {recipeCount} recipes
                  </em>
                </div>
                <InfiniteScroll
                  className="pt-4"
                  dataLength={recipes ? recipes.length : 0} //This is important field to render the next data
                  next={() => {
                    getRecipesFromApi();
                  }}
                  hasMore={recipeCount > recipes.length}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                  loader={<h4 className="col-12 text-center">Loading...</h4>}
                  endMessage={
                    <p className="col-12" style={{textAlign: 'center'}}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }>
                  {localRecipes && loadRecipes(localRecipes)}
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesComponent;
