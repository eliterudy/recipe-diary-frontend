import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Footer from './functional/Footer';
import Header from './functional/Header';

const MainRouter = () => {
  let location = useLocation();

  const HomePage = () => {
    return (
      <div className="">
        <h2>HOMEPAGE</h2>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
};

export default MainRouter;
