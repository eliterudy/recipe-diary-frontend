import React, {useState, useRef, useEffect} from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import Login from './screens/SignIn';
import RecipeList from './screens/RecipeList';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import RecipeDetails from './screens/RecipeDetails';
import {useSelector, useDispatch} from 'react-redux';
import reduxApiCallers from '../redux/thunks/reduxApiCallers';
import actions from '../redux/actionReducers/index';
import {Dispatch} from '@reduxjs/toolkit';
// import {recipes} from '../shared/datasets';
import ScrollToTop from './generic/scrollToTop';
import SignUpComponent from './screens/SignUp';
import SignInComponent from './screens/SignIn';
import MyProfile from './screens/MyProfile';
import AddRecipe from './screens/AddRecipe';
import apis from '../config/api';
import NotFound from './generic/NotFound';
import ServerDown from './generic/ServerDown';

const {loadUser, removeUser, updateServerDownModal} = actions;
const MainRouter = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    var userToken = localStorage.getItem('token');
    userToken &&
      userToken.length > 0 &&
      apis
        .getUserDetails()
        .then(({data}) => {
          dispatch(loadUser(data));
        })
        .catch(err => {
          // alert('failed to load user. Please login');
          dispatch(removeUser());
          // navigate('/serverdown');
        });
    // navigate('/main/home');
  }, []);

  const HomeRoutes = () => {
    const homePath = [{path: '/main/home', pathName: 'Home'}];
    const homeRecipeDetailsPath = [{path: '/main/home', pathName: 'Home'}];
    return (
      <Routes>
        <Route path="/" element={<Home pathDetails={homePath} />} />
        <Route
          path="/recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={homeRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
        {/* default route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };
  const RecipeRoutes = () => {
    const recipePath = [{path: '/main/home', pathName: 'Home'}];
    const recipeRecipeDetailsPath = [
      {path: '/main/home', pathName: 'Home'},
      {path: '/main/recipes', pathName: 'Recipes'},
    ];
    return (
      <Routes>
        <Route path="/" element={<RecipeList pathDetails={recipePath} />} />
        <Route
          path="recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={recipeRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
        {/* default route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };
  const MyProfileRoutes = () => {
    const myProfilePath = [{path: '/main/home', pathName: 'Home'}];
    const myProfileRecipeDetailsPath = [
      {path: '/main/home', pathName: 'Home'},
      {path: '/main/my-profile', pathName: 'My Profile'},
    ];

    return (
      <Routes>
        <Route
          path="/"
          element={
            <ScrollToTop>
              <MyProfile pathDetails={myProfilePath} />
            </ScrollToTop>
          }
        />
        <Route
          path="recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={myProfileRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
        <Route
          path="new/"
          element={
            <ScrollToTop>
              <AddRecipe />
            </ScrollToTop>
          }
        />
        {/* default route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    );
  };

  const MainRoutes = () => {
    const [isModalOpen, updateModalOpen] = useState(false);
    const toggleModal = () => {
      updateModalOpen(!isModalOpen);
    };

    const state = useSelector((state: any) => {
      return {
        userState: state.userActionReducer,
        recipeState: state.recipeActionReducer,
      };
    });
    const {userState, recipeState} = state;
    const {user} = userState;
    useEffect(() => {
      if (
        user &&
        !user.isVerified &&
        (location.pathname === 'main/my-profile/new' ||
          location.pathname === 'main/my-profile/new/')
      ) {
        navigate('/main/my-profile');
      } else if (!user && location.pathname.match('main/my-profile')) {
        navigate('/main/home');
      }
    }, [location.pathname, user]);

    return (
      <div>
        {location.pathname !== '/my-profile/new/' &&
          location.pathname !== '/my-profile/new' && (
            <Header modalCallback={() => toggleModal()} />
          )}
        <Routes>
          {/* Home */}
          <Route path="home/*" element={<HomeRoutes />} />

          {/* Recipes */}
          <Route path="recipes/*" element={<RecipeRoutes />} />

          {/* My Stuff */}
          <Route path="my-profile/*" element={<MyProfileRoutes />} />

          {/* Contact Us */}
          <Route path="contact-us/*" element={<RecipeRoutes />} />

          {/* default route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Footer />
        <Modal
          style={{
            paddingTop: 50,
          }}
          isOpen={isModalOpen}>
          <ModalHeader
            className="noselect"
            charCode="Y"
            toggle={() => toggleModal()}>
            Access denied!
          </ModalHeader>
          <ModalBody className="noselect">
            You dont have access to this feature. To <strong>gain</strong>{' '}
            access,
            <strong> create you very own account</strong> with us. If you
            already have an account, go ahead and <strong>sign in</strong> to
            unlock this feature.
          </ModalBody>
          <ModalFooter>
            <Button
              style={{backgroundColor: '#2b59a1'}}
              onClick={() => {
                toggleModal();
                navigate('/auth/signin');
              }}>
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
          <Route path="signin" element={<SignInComponent />} />
          <Route path="signup" element={<SignUpComponent />} />
          {/* default route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path={'auth/*'} element={<AuthRoutes />} />
        <Route path={'main/*'} element={<MainRoutes />} />
        <Route path={'not-found'} element={<NotFound />} />
        <Route path="*" element={<Navigate to="main/home" replace />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
