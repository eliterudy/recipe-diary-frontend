import React, {useState, useRef, useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import RecipeList from './screens/RecipeList';

import RecipeDetails from './screens/RecipeDetails';
import {useSelector, useDispatch} from 'react-redux';
import reduxApiCallers from '../redux/thunks/reduxApiCallers';
import actionReducers from '../redux/actionReducers/index';
import {Dispatch} from '@reduxjs/toolkit';
import {recipes} from '../shared/datasets';
import ScrollToTop from './generic/scrollToTop';

const {recipesLoading, recipesLoadingFailed, addRecipes} = actionReducers;
const {fetchRecipes} = reduxApiCallers;
const MainRouter = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let location = useLocation();
  // This runs when I am on Recipe details page after i refresh the page
  dispatch(addRecipes(recipes));
  // This doesn't. It only is called when I launch the root Route
  // useEffect(() => {
  //   console.log('INSIDE USE_EFFECT');
  //   dispatch(addRecipes(recipes));
  // }, []);

  const HomePage = () => {
    return <Home />;
  };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/home/specials/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails />
            </ScrollToTop>
          }
        />
        <Route
          path="/recipes"
          element={
            // <ScrollToTop>
            <RecipeList />
            // </ScrollToTop>
          }
        />
        <Route path="/recipes/:recipeId" element={<HomePage />} />
        <Route path="/contactus" element={<HomePage />} />
        <Route path="/specials" element={<HomePage />} />
        <Route path="/specials/:recipeId" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default MainRouter;
