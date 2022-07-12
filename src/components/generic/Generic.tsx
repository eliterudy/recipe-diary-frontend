import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import useHover from './useHover';
import {RecipeCardProps} from '../../config/types';
import {icons} from '../../config/configuration';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import actionReducers from '../../redux/actionReducers/index';
import UseAnimation from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';

const {addRecipeToFavorites, deleteRecipeFromFavorites} = actionReducers;

const Generic = {
  RecipeCard: (cardProps: RecipeCardProps) => {
    const dispatch: Dispatch<any> = useDispatch();
    const {data, index, redirect} = cardProps;
    const {
      id,
      title,
      ingredients,
      instructions,
      imageUrl,
      cuisine,
      totalTimeInMins,
      diet,
      servings,
      course,
      ingredientCount,
      isFavorite,
    } = data;
    const hover = useHover(
      {
        transform: 'scale(1.05)',
        zIndex: 10,
        transition: '0.5s',
      },
      {transition: '0.3s'},
    );

    return (
      // <Link
      //   to={redirect}
      //   state={{recipeId: data.id}}
      //   style={{textDecoration: 'none', color: 'black'}}>
      <div {...hover}>
        <Card className=" col-12 col-sm-12">
          <CardBody className="p-0">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <div
              className="w-100 img-fluid center"
              style={{
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                height: 320,
                objectFit: 'cover',
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <div
                className=" "
                style={{
                  marginTop: -8,
                  padding: 5,
                }}>
                {/* <img
                  className="col-auto "
                  src={isFavorite ? icons.bookmark_red : icons.bookmark_white}
                  height={50}
                  width={50}
                  alt="The Cook Book"
                  onClick={() => {
                    console.log('her');
                    isFavorite
                      ? dispatch(deleteRecipeFromFavorites(id))
                      : dispatch(addRecipeToFavorites(id));
                  }}
                /> */}
                <UseAnimation
                  animation={heart}
                  size={40}
                  onClick={() => {
                    // eslint-disable-next-line
                    console.log('isFav', isFavorite);
                    isFavorite
                      ? dispatch(deleteRecipeFromFavorites(id))
                      : dispatch(addRecipeToFavorites(id));
                  }}
                />
              </div>
              <div
                className="px-2 mb-1 me-1 py-1"
                style={{backgroundColor: 'antiquewhite', borderRadius: 50}}>
                {totalTimeInMins} min
              </div>
            </div>
            <div className="p-4 pb-2">
              <CardTitle tag="h5" style={{color: 'black'}}>
                {title}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {`${cuisine} | ${course} | ${servings} servings`}
              </CardSubtitle>
            </div>
          </CardBody>
        </Card>
      </div>
      // </Link>
    );
  },
};

export default Generic;
