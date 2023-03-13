import {To} from 'react-router-dom';

export interface RecipeDetails {
  _id: string;
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
  comments?: any;
}

export interface RecipeListElement {
  _id: string;
  title: string;
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
  data: RecipeListElement;
  index: number;
  redirect: To;
}

export interface Favorites {
  recipes: string[];
}

export interface Recents {
  recipes: string[];
}
export interface Published {
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
  published: Published;
  isAdmin: boolean;
  isVerified?: boolean;
  email: string;
}

export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

export interface RecipeFilters {
  cuisine?: string[];
  course?: string[];
  diet?: string[];
  servings?: string[];
}
