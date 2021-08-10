import {
  SET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL, TDetailIngredientActions
} from '../actions/inrgedientInfo';
import {TIngredient} from "../types/data";

type TIngredientInfo = {
  ingredient: TIngredient | null;
}

const initialState: TIngredientInfo = {
  ingredient: null
};

export const ingredientInfoReducer = (state = initialState, action: TDetailIngredientActions): TIngredientInfo => {
  switch (action.type) {
    case SET_INGREDIENT_DETAIL: {
      return {
        ...state,
        ingredient: action.payload
      };
    }
    case CLEAR_INGREDIENT_DETAIL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
