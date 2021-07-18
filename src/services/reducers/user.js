import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  USER_CLEAR_ERROR,

  USER_LOAD_DATA_REQUEST,
  USER_LOAD_DATA_SUCCESS,
  USER_LOAD_DATA_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  USER_SAVE_REQUEST,
  USER_SAVE_SUCCESS,
  USER_SAVE_FAILED, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED
} from '../actions/user';
import {deleteCookie, setCookie} from '../../utils/cookie';

const initialState = {
  user: {
    email: '',
    name: ''
  },

  loginUserRequest: false,
  loginUserFailed: false,
  loginUserSuccess: false,
  loginUserError: '',

  logoutUserRequest: false,
  logoutUserFailed: false,
  logoutUserSuccess: false,
  logoutUserError: '',

  loadUserRequest: false,
  loadUserFailed: false,
  loadUserSuccess: false,
  loadUserError: '',

  saveUserRequest: false,
  saveUserFailed: false,
  saveUserSuccess: false,
  saveUserError: '',

  registerUserRequest: false,
  registerUserFailed: false,
  registerUserSuccess: false,
  registerUserError: '',

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,
  forgotPasswordError: '',

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  resetPasswordError: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case REGISTER_USER_REQUEST: {
      return { ...state, registerUserRequest: true };
    }
    case REGISTER_USER_SUCCESS: {
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      return { ...state, registerUserFailed: false, registerUserError: '', registerUserRequest: false, user: action.payload.user};
    }
    case REGISTER_USER_FAILED: {
      return { ...initialState, registerUserFailed: true, registerUserRequest: false, registerUserError: action.payload };
    }

    case LOGIN_USER_REQUEST: {
      return { ...state, loginUserRequest: true };
    }
    case LOGIN_USER_SUCCESS: {
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      return { ...state, loginUserFailed: false, loginUserError: '', loginUserRequest: false, user: action.payload.user};
    }
    case LOGIN_USER_FAILED: {
      return { ...initialState, loginUserFailed: true, loginUserRequest: false, loginUserError: action.payload };
    }

    case LOGOUT_USER_REQUEST: {
      return { ...state, logoutUserRequest: true };
    }
    case LOGOUT_USER_SUCCESS: {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return { ...state, logoutUserFailed: false, logoutUserSuccess: true, logoutUserError: '', logoutUserRequest: false, user: {name: '', email: ''}};
    }
    case LOGOUT_USER_FAILED: {
      return { ...initialState, logoutUserFailed: true, logoutUserRequest: false, logoutUserError: action.payload };
    }

    case USER_LOAD_DATA_REQUEST: {
      return { ...state, loadUserRequest: true };
    }
    case USER_LOAD_DATA_SUCCESS:{
      return { ...state, loadUserFailed: false, loadUserError: '', loadUserRequest: false, user: action.payload.user};
    }
    case USER_LOAD_DATA_FAILED: {
      return { ...initialState, loadUserFailed: true, loadUserRequest: false, loadUserError: action.payload };
    }

    case USER_SAVE_REQUEST: {
      return { ...state, saveUserRequest: true };
    }
    case USER_SAVE_SUCCESS: {
      return { ...state, saveUserFailed: false, saveUserError: '', saveUserRequest: false, user: action.payload.user};
    }
    case USER_SAVE_FAILED: {
      return { ...initialState, saveUserFailed: true, saveUserRequest: false, saveUserError: action.payload };
    }

    case USER_CLEAR_ERROR: {
      return {...state,
        loginUserError: '',
        registerUserError: '',
        loadUserError: '',
        forgotPasswordError: '',
        resetPasswordError: '',
        saveUserError: '',
        logoutUserError: ''
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return { ...state, forgotPasswordRequest: true };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return { ...state, forgotPasswordFailed: false, forgotPasswordError: '', forgotPasswordRequest: false, forgotPasswordSuccess: true};
    }
    case FORGOT_PASSWORD_FAILED: {
      return { ...initialState, forgotPasswordFailed: true, forgotPasswordError: action.payload };
    }

    case RESET_PASSWORD_REQUEST: {
      return { ...state, resetPasswordRequest: true };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, resetPasswordFailed: false, resetPasswordError: '', resetPasswordRequest: false, resetPasswordSuccess: true};
    }
    case RESET_PASSWORD_FAILED: {
      return { ...initialState, resetPasswordFailed: true, resetPasswordError: action.payload };
    }

    default: {
      return state;
    }
  }
};