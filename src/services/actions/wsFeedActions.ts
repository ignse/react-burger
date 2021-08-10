import {TOrder} from "../types/data";

export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE';

export interface IFeedConnectionStartAction {
	readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IFeedConnectionSuccessAction {
	readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
	readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IFeedConnectionClosedAction {
	readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IFeedSendMessageAction {
	readonly type: typeof WS_FEED_SEND_MESSAGE;
}

export interface IFeedGetMessageAction {
	readonly type: typeof WS_FEED_GET_MESSAGE;
	payload: {
		orders: ReadonlyArray<TOrder>
		total: number;
		totalToday: number;
	}
}

export type TFeedActions =
	| IFeedConnectionStartAction
	| IFeedConnectionSuccessAction
	| IFeedConnectionClosedAction
	| IFeedConnectionErrorAction
	| IFeedGetMessageAction
	| IFeedSendMessageAction;
