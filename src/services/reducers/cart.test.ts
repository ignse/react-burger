import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CART, TCartActions
} from '../actions/cart';
import {TIngredient} from "../types/data";
import {cartReducer} from "./cart";

type TCartState = {
  bun: TIngredient | null;
  items: Array<TIngredient>;
  count: number;
  total: number;
};

const initialState: TCartState = {
  bun: null,
  items: [],
  count: 0,
  total: 0,
};

describe('Action creators for cart test', () => {
  it('should return isinitialState', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('should add ingredient to the cart', () => {

    const ingredient: TIngredient = {
      "_id": "60666c42cc7b410027a1a9b1",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0,
      "count": 10
    };

    expect(cartReducer(initialState, {type: ADD_INGREDIENT, data: ingredient})).toEqual({
      ...initialState,
      bun: ingredient,
      count: 2,
      total: 2510
    });
  });

  it('should handle move ingredient in the cart', () => {
    const itemsBefore: Array<TIngredient> = [{
      "_id": "60666c42cc7b410027a1a9bf",
      "name": "Сыр с астероидной плесенью",
      "type": "main",
      "proteins": 84,
      "fat": 48,
      "carbohydrates": 420,
      "calories": 3377,
      "price": 4142,
      "image": "https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v": 0
    },
      {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
      }];

    const itemsAfter: Array<TIngredient> = [{
      "_id": "60666c42cc7b410027a1a9b5",
      "name": "Говяжий метеорит (отбивная)",
      "type": "main",
      "proteins": 800,
      "fat": 800,
      "carbohydrates": 300,
      "calories": 2674,
      "price": 3000,
      "image": "https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v": 0
    },
      {
        "_id": "60666c42cc7b410027a1a9bf",
        "name": "Сыр с астероидной плесенью",
        "type": "main",
        "proteins": 84,
        "fat": 48,
        "carbohydrates": 420,
        "calories": 3377,
        "price": 4142,
        "image": "https://code.s3.yandex.net/react/code/cheese.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
        "__v": 0
      }];

    expect(cartReducer({...initialState, items: itemsBefore}, {
      type: MOVE_INGREDIENT,
      payload: {currentIndex: 0, newIndex: 1}
    })).toEqual({...initialState, items: itemsAfter});
  });

  it('should handle delete ingredient from cart', () => {
    const itemsBefore: Array<TIngredient> = [{
      "_id": "60666c42cc7b410027a1a9bf",
      "name": "Сыр с астероидной плесенью",
      "type": "main",
      "proteins": 84,
      "fat": 48,
      "carbohydrates": 420,
      "calories": 3377,
      "price": 4142,
      "image": "https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v": 0
    },
      {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
      }];

    const itemsAfter: Array<TIngredient> = [{
      "_id": "60666c42cc7b410027a1a9bf",
      "name": "Сыр с астероидной плесенью",
      "type": "main",
      "proteins": 84,
      "fat": 48,
      "carbohydrates": 420,
      "calories": 3377,
      "price": 4142,
      "image": "https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v": 0
    }];

    expect(cartReducer({...initialState, items: itemsBefore, count: 2, total: 7142}, {
      type: DELETE_INGREDIENT,
      payload: 1
    })).toEqual({...initialState, items: itemsAfter, count: 1, total: 4142});
  });

  it('should handle clear cart', () => {
    const itemsBefore: Array<TIngredient> = [{
      "_id": "60666c42cc7b410027a1a9bf",
      "name": "Сыр с астероидной плесенью",
      "type": "main",
      "proteins": 84,
      "fat": 48,
      "carbohydrates": 420,
      "calories": 3377,
      "price": 4142,
      "image": "https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v": 0
    },
      {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
      }];

    expect(cartReducer({...initialState, items: itemsBefore}, {type: CLEAR_CART})).toEqual(initialState);
  });

});
