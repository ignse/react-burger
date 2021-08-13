import {
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS
} from '../actions/modal';
import {modalReducer} from "./modal";

type TModal = {
  ingredientDetailsVisible: boolean,
  orderDetailsVisible: boolean;
};

const initialState: TModal = {
  ingredientDetailsVisible: false,
  orderDetailsVisible: false
};

describe('Action creators for modal test', () => {
  it('should return isinitialState', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle show order details action', () => {
    expect(modalReducer(initialState, {type: SHOW_ORDER_DETAILS})).toEqual({
      ...initialState,
      orderDetailsVisible: true
    });
  });

  it('should handle hide order details action', () => {
    expect(modalReducer(initialState, {type: HIDE_ORDER_DETAILS})).toEqual({
      ...initialState,
      orderDetailsVisible: false
    });
  });

  it('should handle show ingredient details action', () => {
    expect(modalReducer(initialState, {type: SHOW_INGREDIENT_DETAILS})).toEqual({
      ...initialState,
      ingredientDetailsVisible: true
    });
  });

  it('should handle hide ingredient details action', () => {
    expect(modalReducer(initialState, {type: HIDE_INGREDIENT_DETAILS})).toEqual({
      ...initialState,
      ingredientDetailsVisible: false
    });
  });

});
