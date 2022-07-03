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
import {NavLink} from 'react-router-dom';
import {url} from 'inspector';

interface DishCardData {
  title: string;
  ingredients: string[];
  instructions: string[];
  ingredientsUsed: string[];
  imageUrl: string;
  cuisine: string;
  course: string;
  diet: string;
  url: string;
  prepTimeInMins: number;
  cookTimeInMins: number;
  totalTimeInMins: number;
  servings: number;
  ingredientCount: number;
}

interface DishCardProps {
  data: DishCardData;
}

const Generic = {
  DishCard: (cardProps: DishCardProps) => {
    const {
      title,
      ingredients,
      instructions,
      imageUrl,
      cuisine,
      totalTimeInMins,
      diet,
      servings,
      ingredientCount,
    } = cardProps.data;
    return (
      <div className="col-12 px-2 col-sm-4 mb-5">
        <Card className=" col-12 col-sm-11">
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
            <div className="p-4">
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {cuisine}
              </CardSubtitle>
              <CardText className="row">
                <div className=" col-6 d-flex flex-row align-items-center  ">
                  <img
                    className="col-auto"
                    src="assets/icons/serve.png"
                    height={30}
                    width={30}
                    alt="serve"
                  />
                  <span className="  col-auto  mb-0  ms-1  p">{` ${servings} servings`}</span>
                </div>
                <div className="col-6 d-flex flex-row align-items-center  ">
                  <img
                    className="col-auto"
                    src="assets/icons/time.png"
                    height={30}
                    width={30}
                    alt="time"
                  />
                  <span className="  col-auto  mb-0  ms-1  p">
                    {` ${totalTimeInMins} Min`}
                  </span>
                </div>
              </CardText>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  },
};

export default Generic;
