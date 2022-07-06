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

const Generic = {
  RecipeCard: (cardProps: RecipeCardProps) => {
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
    } = data;
    const hover = useHover(
      {
        transform: 'scale(1.05)',
        zIndex: 10,
        transition: '0.5s',
      },
      {transition: '0.3s'},
    );
    console.log('CARD: ', id, data, redirect);

    return (
      <Link
        to={redirect}
        state={{recipeId: data.id}}
        style={{textDecoration: 'none', color: 'black'}}>
        <div {...hover}>
          <Card className=" col-12 col-sm-12">
            <CardBody className="p-0">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img
                src={imageUrl}
                className="w-100 img-fluid center"
                alt={title}
                style={{
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  height: 320,
                  objectFit: 'cover',
                }}
              />
              <div className="p-4 pb-2">
                <CardTitle tag="h5" style={{color: 'black'}}>
                  {title}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {cuisine}
                </CardSubtitle>
              </div>
              <div className="row  mx-0">
                <div className=" col-4 d-flex flex-column align-items-center p-2 ">
                  <img
                    className="col-auto"
                    src="assets/icons/serve.png"
                    height={40}
                    width={40}
                    alt="serve"
                  />
                  <span className="col-auto  mb-0  ms-1 text-center">{` ${servings} servings`}</span>
                </div>
                <div className=" col-4 d-flex flex-column align-items-center  p-2 ">
                  <img
                    className="col-auto"
                    src="assets/icons/time.png"
                    height={40}
                    width={40}
                    alt="time"
                  />
                  <span className="  col-auto  mb-0  ms-1 text-center">
                    {` ${totalTimeInMins} min`}
                  </span>
                </div>
                <div className=" col-4 d-flex flex-column align-items-center p-2 ">
                  <img
                    className="col-auto"
                    src="assets/icons/course.png"
                    height={40}
                    width={40}
                    alt="serve"
                  />
                  <span className="  col-auto  mb-0  ms-1 text-center">{` ${course} `}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Link>
    );
  },
};

export default Generic;
