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
      course,
      ingredientCount,
    } = cardProps.data;
    return (
      <div className="">
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
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {cuisine}
              </CardSubtitle>
            </div>
            <CardText className="row  mx-0">
              <div className=" col-4 d-flex flex-column align-items-center p-2 ">
                <img
                  className="col-auto"
                  src="assets/icons/serve.png"
                  height={30}
                  width={30}
                  alt="serve"
                />
                <span className="  col-auto  mb-0  ms-1  p">{` ${servings} servings`}</span>
              </div>
              <div className=" col-4 d-flex flex-column align-items-center  p-2 ">
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
              <div className=" col-4 d-flex flex-column align-items-center  p-2 ">
                <img
                  className="col-auto"
                  src="assets/icons/course.png"
                  height={30}
                  width={30}
                  alt="serve"
                />
                <span className="  col-auto  mb-0  ms-1  p">{` ${course} `}</span>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  },
};

export default Generic;
