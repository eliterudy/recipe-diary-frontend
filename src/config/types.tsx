import {To} from 'react-router-dom';

export interface RecipeDetails {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  cuisine: string;
  course: string;
  diet: string;
  prepTimeInMins: number;
  cookTimeInMins: number;
  totalTimeInMins: number;
  servings: number;
  featured: boolean;
  isFavorite?: boolean;
  author: User;
}

export interface RecipeCardProps {
  data: RecipeDetails;
  index: number;
  redirect: To;
}

export interface Favorites {
  recipes: string[];
}

export interface Recents {
  recipes: string[];
}

export interface User {
  _id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  username: string;
  favorites: Favorites;
  recents: Recents;
  isAdmin: boolean;
  isVerified?: boolean;
  email: string;
}

export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}
