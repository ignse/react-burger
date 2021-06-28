import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { cartReducer } from './cart';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { ingredientInfoReducer } from './ingredientInfo';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  order: orderReducer,
  modal: modalReducer,
  info: ingredientInfoReducer,
});
