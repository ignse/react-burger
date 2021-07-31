import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import config from './utils/config';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {
    WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "./services/actions/wsFeedActions";
import {getCookie} from "./utils/cookie";
import {
    WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_MESSAGE,
    WS_ORDERS_SEND_MESSAGE
} from "./services/actions/wsOrdersActions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

let accessToken = getCookie('accessToken') || '';

if (accessToken.indexOf('Bearer') === 0) {
    accessToken = accessToken.split('Bearer ')[1];
}

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(config.wsUrl + '/all', {
        wsInit:         WS_FEED_CONNECTION_START,
        wsSendMessage:  WS_FEED_SEND_MESSAGE,
        onOpen:         WS_FEED_CONNECTION_SUCCESS,
        onClose:        WS_FEED_CONNECTION_CLOSED,
        onError:        WS_FEED_CONNECTION_ERROR,
        onMessage:      WS_FEED_GET_MESSAGE
    }),
   socketMiddleware(config.wsUrl + `?token=${accessToken}`, {
        wsInit:         WS_ORDERS_CONNECTION_START,
        wsSendMessage:  WS_ORDERS_SEND_MESSAGE,
        onOpen:         WS_ORDERS_CONNECTION_SUCCESS,
        onClose:        WS_ORDERS_CONNECTION_CLOSED,
        onError:        WS_ORDERS_CONNECTION_ERROR,
        onMessage:      WS_ORDERS_GET_MESSAGE
    })
));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
