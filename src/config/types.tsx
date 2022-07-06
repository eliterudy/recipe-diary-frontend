import {To} from 'react-router-dom';

export interface RecipeDetails {
  id: string;
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

export interface RecipeCardProps {
  data: RecipeDetails;
  index: number;
  redirect: To;
}
