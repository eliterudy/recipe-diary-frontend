import React, {useState, useRef, useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import RecipeList from './screens/RecipeList';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
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
  dispatch(addRecipes(recipes));

  const [isModalOpen, updateModalOpen] = useState(false);

  const toggleModal = () => {
    updateModalOpen(!isModalOpen);
  };

  const HomePage = () => {
    return <Home />;
  };

  return (
    <div>
      <Header modalCallback={() => toggleModal()} />
      {/* Routes are defined and wrapped with a switch component */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/home/:recipeId"
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
        <Route
          path="/recipes/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails />
            </ScrollToTop>
          }
        />
        <Route path="/my-stuff" element={<HomePage />} />
        <Route path="/contact-us" element={<RecipeList />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Modal
        style={{
          paddingTop: 50,
        }}
        isOpen={isModalOpen}>
        <ModalHeader charCode="Y" toggle={() => toggleModal()}>
          Access denied!
        </ModalHeader>
        <ModalBody>
          You dont have access to this feature. To <strong>gain</strong> access,
          <strong> create you very own account</strong> with us. If you already
          have an account, go ahead and <strong>login</strong> to unlock this
          feature.
        </ModalBody>
        <ModalFooter>
          <Button
            style={{backgroundColor: '#2785bd'}}
            onClick={() => toggleModal()}>
            Do it now
          </Button>
          <Button onClick={() => toggleModal()}>Do it later</Button>
        </ModalFooter>
      </Modal>
      <Footer />
    </div>
  );
};

export default MainRouter;
