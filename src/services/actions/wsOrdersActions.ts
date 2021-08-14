import {TOrder} from "../types/data";

export const WS_ORDERS_CONNECTION_START = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE = 'WS_ORDERS_GET_MESSAGE';
export const WS_ORDERS_SEND_MESSAGE = 'WS_ORDERS_SEND_MESSAGE';


export interface IOrdersConnectionStartAction {
	readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IOrdersConnectionSuccessAction {
	readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionErrorAction {
	readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}

export interface IOrdersConnectionClosedAction {
	readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersSendMessageAction {
	readonly type: typeof WS_ORDERS_SEND_MESSAGE;
}

export interface IOrdersGetMessageAction {
	readonly type: typeof WS_ORDERS_GET_MESSAGE;
	payload: {
		orders: ReadonlyArray<TOrder>
		total: number;
		totalToday: number;
	}
}

export type TOrdersActions =
	| IOrdersConnectionStartAction
	| IOrdersConnectionSuccessAction
	| IOrdersConnectionClosedAction
	| IOrdersConnectionErrorAction
	| IOrdersGetMessageAction
	| IOrdersSendMessageAction;