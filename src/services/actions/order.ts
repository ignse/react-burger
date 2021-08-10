import config from '../../utils/config';
import {SHOW_ORDER_DETAILS} from './modal';
import {CLEAR_CART} from './cart';
import {getCookie} from '../../utils/cookie';
import {fetchWithRefresh} from './user';
import {AppDispatch, AppThunk} from "../types";
import {TOrder} from "../types/data";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';
export const MAKE_ORDER_INVALID = 'MAKE_ORDER_INVALID';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';
export const CLEAR_ORDER_DETAIL = 'CLEAR_ORDER_DETAIL';

export interface IMakeOrderAction {
  readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderFailedAction {
  readonly type: typeof MAKE_ORDER_FAILED;
}

export interface IMakeOrderSuccessAction {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly payload: string;
}

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrder;
}

export interface IMakeOrderInvalidAction {
  readonly type: typeof MAKE_ORDER_INVALID;
}

export interface ISetOrderDetailAction {
  readonly type: typeof SET_ORDER_DETAIL;
  readonly payload: TOrder;
}

export interface IClearOrderDetailAction {
  readonly type: typeof CLEAR_ORDER_DETAIL;
}

export type TOrderActions =
  | IMakeOrderAction
  | IMakeOrderFailedAction
  | IMakeOrderSuccessAction
  | IGetOrderAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction
  | IMakeOrderInvalidAction
  | ISetOrderDetailAction
  | IClearOrderDetailAction;

export const makeOrder: AppThunk = (ingredients: ReadonlyArray<string>) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    });
    fetchWithRefresh(config.apiUrl + '/api/orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('accessToken'),
      },
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients
      })
    })
    .then((data) => {
      dispatch({ type: MAKE_ORDER_SUCCESS, payload: data.order.number})
      dispatch({type: CLEAR_CART});
    })
    .catch(e => dispatch({
      type: MAKE_ORDER_FAILED
    }))
    .finally(() => dispatch({
      type: SHOW_ORDER_DETAILS
    }))
  }
}

export const getOrder: AppThunk = (id: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch(config.apiUrl + '/api/orders/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => dispatch({
          type: GET_ORDER_SUCCESS,
          payload: data.orders[0]
        }))
        .catch(e => dispatch({
          type: GET_ORDER_FAILED
        }))
  };
}