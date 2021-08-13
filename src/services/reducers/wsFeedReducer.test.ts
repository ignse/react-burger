import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE
} from '../actions/wsFeedActions';
import {TOrder} from "../types/data";
import {wsFeedReducer} from "./wsFeedReducer";

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

describe('Action creators for ws feed', () => {
  it('should return isinitialState', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ws feed connection success', () => {
    expect(wsFeedReducer(initialState, {type: WS_FEED_CONNECTION_SUCCESS})).toEqual({
      ...initialState,
      wsConnected: true
    });
  });

  it('should handle ws feed connection error', () => {
    expect(wsFeedReducer({...initialState, wsConnected: true}, {type: WS_FEED_CONNECTION_ERROR})).toEqual(initialState);
  });

  it('should handle ws feed connection closed', () => {
    expect(wsFeedReducer({
      ...initialState,
      wsConnected: true
    }, {type: WS_FEED_CONNECTION_CLOSED})).toEqual(initialState);
  });

  it('should handle ws feed get message', () => {

    const orders: Array<TOrder> = [{
      "_id": "610468639d952f001b821e64",
      "ingredients": ["60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      "status": "done",
      "name": "Space флюоресцентный бессмертный антарианский бургер",
      "createdAt": "2021-07-30T21:00:19.808Z",
      "number": "1298"
    }];

    expect(wsFeedReducer(initialState, {
      type: WS_FEED_GET_MESSAGE,
      payload: {orders: orders, total: 100, totalToday: 1000}
    })).toEqual({...initialState, orders: orders, total: 100, totalToday: 1000});
  });
});