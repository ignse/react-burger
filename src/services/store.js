import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './../services/reducers';
import thunk from 'redux-thunk';
import {socketMiddleware} from "./../services/middleware/socketMiddleware";
import {
	WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR,
	WS_FEED_CONNECTION_START,
	WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE,
	WS_FEED_SEND_MESSAGE
} from "./actions/wsFeedActions";
import config from './../utils/config';
import {
	WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR,
	WS_ORDERS_CONNECTION_START,
	WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_MESSAGE,
	WS_ORDERS_SEND_MESSAGE
} from "./actions/wsOrdersActions";

const composeEnhancers = (typeof window !== "undefined" && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;

const enhancer = composeEnhancers(applyMiddleware(
	thunk,
	socketMiddleware(config.wsUrl + '/all', {
		wsInit:         WS_FEED_CONNECTION_START,
		wsSendMessage:  WS_FEED_SEND_MESSAGE,
		onOpen:         WS_FEED_CONNECTION_SUCCESS,
		onClose:        WS_FEED_CONNECTION_CLOSED,
		onError:        WS_FEED_CONNECTION_ERROR,
		onMessage:      WS_FEED_GET_MESSAGE
	}, false),
	socketMiddleware(config.wsUrl, {
		wsInit:         WS_ORDERS_CONNECTION_START,
		wsSendMessage:  WS_ORDERS_SEND_MESSAGE,
		onOpen:         WS_ORDERS_CONNECTION_SUCCESS,
		onClose:        WS_ORDERS_CONNECTION_CLOSED,
		onError:        WS_ORDERS_CONNECTION_ERROR,
		onMessage:      WS_ORDERS_GET_MESSAGE
	}, true)
));

export const store = createStore(rootReducer, enhancer);