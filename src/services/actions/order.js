import config from '../../utils/config';
import {SHOW_ORDER_DETAILS} from './modal';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export function makeOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    });
    fetch(config.apiUrl + '/api/orders', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(data => dispatch({ type: MAKE_ORDER_SUCCESS, payload: data.order.number}))
    .catch(e => dispatch({
      type: MAKE_ORDER_FAILED
    }))
    .finally(() => dispatch({
      type: SHOW_ORDER_DETAILS
    }))
  }
}