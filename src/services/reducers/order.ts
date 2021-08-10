import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_INVALID,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED, SET_ORDER_DETAIL, CLEAR_ORDER_DETAIL, TOrderActions
} from '../actions/order';
import {TOrder} from "../types/data";

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

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return { ...state, orderRequest: true, orderInvalid: false };
    }
    case MAKE_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, orderNumber: action.payload, orderRequest: false };
    }
    case MAKE_ORDER_FAILED: {
      return { ...initialState, orderFailed: true, orderRequest: false };
    }
    case MAKE_ORDER_INVALID: {
      return { ...state, orderInvalid: true };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true, orderInvalid: false };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, order: action.payload, orderRequest: false };
    }
    case GET_ORDER_FAILED: {
      return { ...initialState, orderFailed: true, orderRequest: false };
    }
    case SET_ORDER_DETAIL: {
      return {
        ...state,
        order: action.payload
      };
    }
    case CLEAR_ORDER_DETAIL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};