import config from '../../utils/config';
import {getCookie, setCookie} from '../../utils/cookie';

export const REGISTER_USER_REQUEST  = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS  = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED   = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST     = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS     = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED      = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST     = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS     = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED      = 'LOGOUT_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST  = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS  = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED   = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST  = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS  = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED   = 'RESET_PASSWORD_FAILED';

export const USER_LOAD_DATA_REQUEST = 'USER_LOAD_DATA_REQUEST';
export const USER_LOAD_DATA_SUCCESS = 'USER_LOAD_DATA_SUCCESS';
export const USER_LOAD_DATA_FAILED  = 'USER_LOAD_DATA_FAILED';

export const USER_SAVE_REQUEST      = 'USER_SAVE_REQUEST';
export const USER_SAVE_SUCCESS      = 'USER_SAVE_SUCCESS';
export const USER_SAVE_FAILED       = 'USER_SAVE_FAILED';

export const USER_CLEAR_ERROR       = 'USER_CLEAR_ERROR';

export function registerUser(user) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    fetch(config.apiUrl + '/api/auth/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(checkResponse)
    .then((data) => {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data})
    })
    .catch(e => dispatch({
      type: REGISTER_USER_FAILED,
      payload: e.message
    }))
  }
}

export function loginUser(user) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    fetch(config.apiUrl + '/api/auth/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
        .then(checkResponse)
        .then((data) => {
          dispatch({ type: LOGIN_USER_SUCCESS, payload: data})
        })
        .catch(e => dispatch({
          type: LOGIN_USER_FAILED,
          payload: e.message
        }))
  }
}

export function loadUser(afterLoad) {
  return function(dispatch) {
    dispatch({
      type: USER_LOAD_DATA_REQUEST
    });
    fetchWithRefresh(config.apiUrl + '/api/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken')
      },
      method: 'GET'
    })
        .then((data) => {
          dispatch({ type: USER_LOAD_DATA_SUCCESS, payload: data})
          afterLoad({...data.user, password: ''});
        })
        .catch(e => dispatch({
          type: USER_LOAD_DATA_FAILED,
          payload: e.message
        }))
  }
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    fetch(config.apiUrl + '/api/auth/logout', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
        .then((data) => {
          dispatch({ type: LOGOUT_USER_SUCCESS});
        })
        .catch(e => dispatch({
          type: LOGOUT_USER_FAILED,
          payload: e.message
        }))
  }
}

export function forgotPassword(form) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    fetch(config.apiUrl + '/api/password-reset', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((data) => {
          dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data})
        })
        .catch(e => dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: e.message
        }))
  }
}

export function resetPassword(form) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    fetch(config.apiUrl + '/api/password-reset/reset', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((data) => {
          dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data})
        })
        .catch(e => dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: e.message
        }))
  }
}

export function saveUser(user) {
  return function(dispatch) {
    dispatch({
      type: USER_SAVE_REQUEST
    });
    fetchWithRefresh(config.apiUrl + '/api/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken')
      },
      method: 'PATCH',
      body: JSON.stringify(user)
    })
        .then((data) => {
          dispatch({ type: USER_SAVE_SUCCESS, payload: data})
        })
        .catch(e => dispatch({
          type: USER_SAVE_FAILED,
          payload: e.message
        }))
  }
}

export const checkResponse = (res) => {
    return res.ok ? res.json() : (res.json().then((err) => Promise.reject(err)));
}

export const refreshToken = () => {
  return fetch(config.apiUrl + '/api/auth/token', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
    .then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired')
    {
      const refreshData = await refreshToken();

      setCookie('accessToken', refreshData.accessToken);
      localStorage.setItem('refreshToken', refreshData.refreshToken);

      options.headers.authorization = getCookie('accessToken');

      const res = await fetch(url, options);
      return await checkResponse(res);
    }
    else {
      Promise.reject(err);
    }
  }
}