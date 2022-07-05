import React, {useState, useRef} from 'react';
import {} from 'reactstrap';
import {useLocation} from 'react-router-dom';

const RecipeDetails = (props: any) => {
  console.log(useLocation());
  console.log(props);
  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Todays Specials</h1>
      </div>
    </>
  );
};

export default RecipeDetails;
