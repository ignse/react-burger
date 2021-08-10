import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { cartReducer } from './cart';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { ingredientInfoReducer } from './ingredientInfo';
import {userReducer} from './user';
import {wsOrdersReducer} from './wsOrdersReducer';
import {wsFeedReducer} from './wsFeedReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: cartReducer,
  order: orderReducer,
  modal: modalReducer,
  info: ingredientInfoReducer,
  user: userReducer,
  orders: wsOrdersReducer,
  feed: wsFeedReducer,
});
