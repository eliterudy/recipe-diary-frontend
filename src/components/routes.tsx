import React, {useState, useRef, useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import Login from './screens/Login';
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

  const HomePage = () => {
    return <Home />;
  };

  const MainRoutes = () => {
    const [isModalOpen, updateModalOpen] = useState(false);
    const toggleModal = () => {
      updateModalOpen(!isModalOpen);
    };
    return (
      <div>
        <Header modalCallback={() => toggleModal()} />
        <Routes>
          {/* Home */}
          <Route path="home/" element={<HomePage />} />
          <Route
            path="home/:recipeId"
            element={
              <ScrollToTop>
                <RecipeDetails />
              </ScrollToTop>
            }
          />

          {/* Recipes */}
          <Route
            path="recipes/"
            element={
              // <ScrollToTop>
              <RecipeList />
              // </ScrollToTop>
            }
          />
          <Route
            path="recipes/:recipeId"
            element={
              <ScrollToTop>
                <RecipeDetails />
              </ScrollToTop>
            }
          />

          {/* My Stuff */}
          <Route path="my-stuff/" element={<HomePage />} />

          {/* Contact Us */}
          <Route path="contact-us/" element={<RecipeList />} />

          {/* default route */}
          <Route path="*" element={<Navigate to="home/" replace />} />
        </Routes>
        <Footer />
        <Modal
          style={{
            paddingTop: 50,
          }}
          isOpen={isModalOpen}>
          <ModalHeader charCode="Y" toggle={() => toggleModal()}>
            Access denied!
          </ModalHeader>
          <ModalBody>
            You dont have access to this feature. To <strong>gain</strong>{' '}
            access,
            <strong> create you very own account</strong> with us. If you
            already have an account, go ahead and <strong>login</strong> to
            unlock this feature.
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
      </div>
    );
  };

  const AuthRoutes = () => {
    return (
      <div>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path={'auth/*'} element={<AuthRoutes />} />
        <Route path="/*" element={<MainRoutes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
