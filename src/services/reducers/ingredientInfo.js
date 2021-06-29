import {
  SET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL
} from '../actions/inrgedientInfo';

const initialState = {
  ingredient: {}
};

export const ingredientInfoReducer = (state = initialState, action) => {
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
