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
import {RecipeCardProps, CheckboxProps} from '../../config/types';
import {icons} from '../../config/configuration';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import actionReducers from '../../redux/actionReducers/index';

const {addRecipeToFavorites, deleteRecipeFromFavorites} = actionReducers;

const Generic = {
  RecipeCard: (cardProps: RecipeCardProps) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);
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
    var bookmarkIcon = () => {
      if (isMouseHoveredOnBookmarkButton) {
        return icons.bookmark_hover;
      } else if (isFavorite) {
        return icons.bookmark_selected;
      }
      return icons.bookmark_unselected;
    };
    return (
      <Link
        to={redirect}
        state={{recipeId: data.id}}
        style={{textDecoration: 'none', color: 'black'}}>
        <div
          {...hover}
          onClick={() => {
            // console.log('clicked');
          }}>
          <Card className=" col-12 col-sm-12 ">
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
                    marginTop: -13,
                    padding: 5,
                  }}>
                  <img
                    onMouseEnter={() => changeMouseStatus(true)}
                    onMouseLeave={() => changeMouseStatus(false)}
                    onMouseDown={() => changeMouseStatus(false)}
                    className="col-auto "
                    src={bookmarkIcon()}
                    height={45}
                    width={45}
                    alt="The Cook Book"
                    onClick={e => {
                      e.preventDefault();
                      console.log('her');
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
      </Link>
    );
  },

  Checkbox: (checkboxProps: CheckboxProps) => {
    const {label, value, onChange} = checkboxProps;
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {`  ${label}`}
      </label>
    );
  },
  // Filters: (filterProps: FilterProps)
};

export default Generic;
