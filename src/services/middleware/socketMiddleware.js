import {getCookie} from '../../utils/cookie';

export const socketMiddleware = (wsUrl, wsActions, useToken) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        let accessToken = getCookie('accessToken') || '';

        if (accessToken.indexOf('Bearer') === 0) {
          accessToken = accessToken.split('Bearer ')[1];
        }

        socket = new WebSocket(wsUrl + (useToken ? `?token=${accessToken}` : ''));
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload};
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};