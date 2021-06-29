import {
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS
} from '../actions/modal';

const initialState = {
  ingredientDetailsVisible: false,
  orderDetailsVisible: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsVisible: true,
      };
    }
    case HIDE_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsVisible: false
      };
    }
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetailsVisible: true
      };
    }
    case HIDE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetailsVisible: false
      };
    }
    default: {
      return state;
    }
  }
};
