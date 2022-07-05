import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import RecipeDetails from './screens/RecipeDetails';

const MainRouter = () => {
  let location = useLocation();

  const HomePage = () => {
    return <Home />;
  };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/specials/:recipeId" element={<RecipeDetails />} />
        <Route path="/recipes" element={<RecipeDetails />} />
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
