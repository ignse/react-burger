import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, TIngredientsActions,
} from '../actions/ingredients';
import {TIngredient} from "../types/data";

export type TIngredientsState = {
  items: Array<TIngredient>;
  itemsRequest: boolean,
  itemsFailed: boolean,
};

const initialState: TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, itemsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.payload, itemsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...initialState, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};