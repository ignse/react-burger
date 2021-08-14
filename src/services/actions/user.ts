import config from '../../utils/config';
import {getCookie, setCookie} from '../../utils/cookie';
import {TUser, TUserPass} from "../types/data";
import {AppDispatch, AppThunk} from "../types";

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

export interface IRegisterUserAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly payload: string;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: {user: TUser; accessToken: string; refreshToken: string};
}

export interface ILoginUserAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload: string;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: {user: TUser; accessToken: string; refreshToken: string}
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly payload: string;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly payload: string;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly payload: string;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface ILoadUserdAction {
  readonly type: typeof USER_LOAD_DATA_REQUEST;
}

export interface ILoadUserFailedAction {
  readonly type: typeof USER_LOAD_DATA_FAILED;
  readonly payload: string;
}

export interface ILoadUserSuccessAction {
  readonly type: typeof USER_LOAD_DATA_SUCCESS;
  readonly payload: {user: TUser};
}

export interface ISaveUserAction {
  readonly type: typeof USER_SAVE_REQUEST;
}

export interface ISaveUserFailedAction {
  readonly type: typeof USER_SAVE_FAILED;
  readonly payload: string;
}

export interface ISaveUserSuccessAction {
  readonly type: typeof USER_SAVE_SUCCESS;
  readonly payload: {user: TUser};
}

export interface IUserClearErrorAction {
  readonly type: typeof USER_CLEAR_ERROR;
}

export type TUserActions =
  | IRegisterUserAction
  | IRegisterUserFailedAction
  | IRegisterUserSuccessAction
  | ILoginUserAction
  | ILoginUserFailedAction
  | ILoginUserSuccessAction
  | ILogoutUserAction
  | ILogoutUserFailedAction
  | ILogoutUserSuccessAction
  | IForgotPasswordAction
  | IForgotPasswordFailedAction
  | IForgotPasswordSuccessAction
  | IResetPasswordAction
  | IResetPasswordFailedAction
  | IResetPasswordSuccessAction
  | ILoadUserdAction
  | ILoadUserFailedAction
  | ILoadUserSuccessAction
  | ISaveUserAction
  | ISaveUserFailedAction
  | ISaveUserSuccessAction
  | IUserClearErrorAction;

export const registerUser: AppThunk = (user: TUserPass) => {
  return function(dispatch: AppDispatch) {
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

export const loginUser: AppThunk = (user: TUser) => {
  return function(dispatch: AppDispatch) {
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

export const loadUser: AppThunk = (afterLoad: Function) => {
  return function(dispatch: AppDispatch) {
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

export const logoutUser: AppThunk = () => {
  return function(dispatch: AppDispatch) {
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

export const forgotPassword: AppThunk = (form: {email: string}) => {
  return function(dispatch: AppDispatch) {
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

export const resetPassword: AppThunk = (form: {password: string, token: string}) => {
  return function(dispatch: AppThunk) {
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

export const saveUser: AppThunk = (user: TUserPass) => {
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

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : (res.json().then((err: string) => Promise.reject(err)));
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

export const fetchWithRefresh = async (url:string, options: any) => {
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