import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_INVALID,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED, SET_ORDER_DETAIL, CLEAR_ORDER_DETAIL
} from '../actions/order';
import {TOrder} from "../types/data";
import {orderReducer} from "./order";

type TOrderState = {
  orderNumber: string,
  orderRequest: boolean,
  orderFailed: boolean,
  orderInvalid: boolean,
  order: TOrder | null,
};

const initialState: TOrderState = {
  orderNumber: '0',
  orderRequest: false,
  orderFailed: false,
  orderInvalid: false,
  order: null,
};

describe('Action creators for order test', () => {
  it('should return isinitialState', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle make order request', () => {
    expect(orderReducer(initialState, {type: MAKE_ORDER_REQUEST})).toEqual({...initialState, orderRequest: true});
  });

  it('should handle make order success', () => {
    expect(orderReducer(initialState, {type: MAKE_ORDER_SUCCESS, payload: '123456'})).toEqual({
      ...initialState,
      orderNumber: '123456'
    });
  });

  it('should handle make order failed', () => {
    expect(orderReducer(initialState, {type: MAKE_ORDER_FAILED})).toEqual({...initialState, orderFailed: true});
  });

  it('should handle make order invalid', () => {
    expect(orderReducer(initialState, {type: MAKE_ORDER_INVALID})).toEqual({...initialState, orderInvalid: true});
  });

  it('should handle get order request', () => {
    expect(orderReducer(initialState, {type: GET_ORDER_REQUEST})).toEqual({...initialState, orderRequest: true});
  });

  it('should handle get order success', () => {

    const order: TOrder = {
      "_id": "610468639d952f001b821e64",
      "ingredients": ["60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      "status": "done",
      "name": "Space флюоресцентный бессмертный антарианский бургер",
      "createdAt": "2021-07-30T21:00:19.808Z",
      "number": "1298"
    };

    expect(orderReducer(initialState, {type: GET_ORDER_SUCCESS, payload: order})).toEqual({
      ...initialState,
      order: order
    });
  });

  it('should handle get order failed', () => {
    expect(orderReducer(initialState, {type: GET_ORDER_FAILED})).toEqual({...initialState, orderFailed: true});
  });

  it('should handle set order detail', () => {

    const order: TOrder = {
      "_id": "610468639d952f001b821e64",
      "ingredients": ["60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      "status": "done",
      "name": "Space флюоресцентный бессмертный антарианский бургер",
      "createdAt": "2021-07-30T21:00:19.808Z",
      "number": "1298"
    };

    expect(orderReducer(initialState, {type: SET_ORDER_DETAIL, payload: order})).toEqual({
      ...initialState,
      order: order
    });
  });

  it('should handle clear order detail', () => {

    const order: TOrder = {
      "_id": "610468639d952f001b821e64",
      "ingredients": ["60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      "status": "done",
      "name": "Space флюоресцентный бессмертный антарианский бургер",
      "createdAt": "2021-07-30T21:00:19.808Z",
      "number": "1298"
    };

    expect(orderReducer({...initialState, order: order}, {type: CLEAR_ORDER_DETAIL})).toEqual(initialState);
  });
});