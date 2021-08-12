import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';
import {TIngredient} from "../types/data";
import {ingredientsReducer, TIngredientsState} from "./ingredients";

const initialState: TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

describe('Action creators for ingredients test', () => {
  it('should handle ingredients request start', () => {
    expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})).toEqual({...initialState, itemsRequest: true});
  });

  it('should handle ingredients request success', () => {
    const items: Array<TIngredient> =  [{
          "_id":"60666c42cc7b410027a1a9b1",
          "name":"Краторная булка N-200i",
          "type":"bun",
          "proteins":80,
          "fat":24,
          "carbohydrates":53,
          "calories":420,
          "price":1255,
          "image":"https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v":0,
          "count": 10
        },
        {
          "_id":"60666c42cc7b410027a1a9b5",
          "name":"Говяжий метеорит (отбивная)",
          "type":"main",
          "proteins":800,
          "fat":800,
          "carbohydrates":300,
          "calories":2674,
          "price":3000,
          "image":"https://code.s3.yandex.net/react/code/meat-04.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
          "__v":0
        }];

    expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_SUCCESS, payload: items})).toEqual({...initialState, items: items, itemsRequest: false});
  });

  it('should handle ingredients request failed', () => {
    expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_FAILED})).toEqual({...initialState, itemsFailed: true});
  });

});