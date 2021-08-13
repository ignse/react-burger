import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE, TOrdersActions
} from '../actions/wsOrdersActions';
import {IEmptyAction, TOrder} from "../types/data";

type TWsOrders = {
  wsConnected: boolean;
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
};

const initialState: TWsOrders = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsOrdersReducer = (state = initialState, action: TOrdersActions | IEmptyAction): TWsOrders => {
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