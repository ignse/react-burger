import {MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED} from '../actions/order';

const initialState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case MAKE_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, orderNumber: action.payload, orderRequest: false };
    }
    case MAKE_ORDER_FAILED: {
      return { ...initialState, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};