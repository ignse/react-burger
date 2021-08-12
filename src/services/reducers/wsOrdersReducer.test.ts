import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../actions/wsOrdersActions';
import {TOrder} from "../types/data";
import {wsOrdersReducer} from "./wsOrdersReducer";

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

describe('Action creators for ws orders', () => {
  it('should handle ws orders connection success', () => {
    expect(wsOrdersReducer(initialState, {type: WS_ORDERS_CONNECTION_SUCCESS})).toEqual({
      ...initialState,
      wsConnected: true
    });
  });

  it('should handle ws orders connection error', () => {
    expect(wsOrdersReducer({...initialState, wsConnected: true}, {type: WS_ORDERS_CONNECTION_ERROR})).toEqual(initialState);
  });

  it('should handle ws orders connection closed', () => {
    expect(wsOrdersReducer({
      ...initialState,
      wsConnected: true
    }, {type: WS_ORDERS_CONNECTION_CLOSED})).toEqual(initialState);
  });

  it('should handle ws orders get message', () => {

    const orders: Array<TOrder> = [{
      "_id": "610468639d952f001b821e64",
      "ingredients": ["60d3b41abdacab0026a733c9", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7"],
      "status": "done",
      "name": "Space флюоресцентный бессмертный антарианский бургер",
      "createdAt": "2021-07-30T21:00:19.808Z",
      "number": "1298"
    }];

    expect(wsOrdersReducer(initialState, {
      type: WS_ORDERS_GET_MESSAGE,
      payload: {orders: orders, total: 100, totalToday: 1000}
    })).toEqual({...initialState, orders: orders, total: 100, totalToday: 1000});
  });
});