import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE, TFeedActions
} from '../actions/wsFeedActions';
import {TOrder} from "../types/data";

type TWsFeed = {
  wsConnected: boolean;
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
};

const initialState: TWsFeed = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsFeedReducer = (state = initialState, action: TFeedActions): TWsFeed => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_GET_MESSAGE:
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
