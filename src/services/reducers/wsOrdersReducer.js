import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../actions/wsOrdersActions';

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

    default:
      return state;
  }
};
