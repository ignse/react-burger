import {
  SET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL
} from '../actions/inrgedientInfo';
import {TIngredient} from "../types/data";
import {ingredientInfoReducer} from "./ingredientInfo";

type TIngredientInfo = {
  ingredient: TIngredient | null;
}
const ingredient: TIngredient =  {
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
};

const initialState: TIngredientInfo = {
  ingredient: null
};

describe('Action creators for ingredient info test', () => {
  it('should return isinitialState', () => {
    expect(ingredientInfoReducer(undefined, {})).toEqual(initialState);
  });

  it('should set ingredient detail', () => {
    expect(ingredientInfoReducer(initialState, {type: SET_INGREDIENT_DETAIL, payload: ingredient})).toEqual({...initialState, ingredient: ingredient});
  });

  it('should clear ingredient detail', () => {
    expect(ingredientInfoReducer({...initialState, ingredient: ingredient}, {type: CLEAR_INGREDIENT_DETAIL})).toEqual(initialState);
  });

});
