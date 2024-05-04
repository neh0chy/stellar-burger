import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsStateSelector } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useSelector(getIngredientsStateSelector);

  const ingredientData = ingredients.find((ingredient) => {
    if (ingredient._id === id) {
      return ingredient;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
