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
import {TUser} from "../types/data";
import {userReducer} from "./user";

type TUserState = {
  user: TUser;
  
  loginUserRequest: boolean;
  loginUserFailed: boolean;
  loginUserSuccess: boolean;
  loginUserError: string,

  logoutUserRequest: boolean;
  logoutUserFailed: boolean;
  logoutUserSuccess: boolean;
  logoutUserError: string;

  loadUserRequest: boolean;
  loadUserFailed: boolean;
  loadUserSuccess: boolean;
  loadUserError: string;

  saveUserRequest: boolean;
  saveUserFailed: boolean;
  saveUserSuccess: boolean;
  saveUserError: string;

  registerUserRequest: boolean;
  registerUserFailed: boolean;
  registerUserSuccess: boolean;
  registerUserError: string;

  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordError: string;

  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;
  resetPasswordError: string;
};

const initialState: TUserState = {
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

describe('Action creators for user test', () => {
  it('should return isinitialState', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle user register request', () => {
    expect(userReducer(initialState, {type: REGISTER_USER_REQUEST})).toEqual({
      ...initialState,
      registerUserRequest: true
    });
  });

  it('should handle user register success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {
      type: REGISTER_USER_SUCCESS,
      payload: {accessToken: 'accessToken', refreshToken: 'refreshToken', user: user}
    })).toEqual({...initialState, user: user, registerUserSuccess: true});
  });

  it('should handle user register failed', () => {
    expect(userReducer(initialState, {type: REGISTER_USER_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      registerUserFailed: true,
      registerUserError: 'Error'
    });
  });

  it('should handle user login request', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_REQUEST})).toEqual({...initialState, loginUserRequest: true});
  });

  it('should handle user login success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {
      type: LOGIN_USER_SUCCESS,
      payload: {accessToken: 'accessToken', refreshToken: 'refreshToken', user: user}
    })).toEqual({...initialState, user: user});
  });

  it('should handle user login failed', () => {
    expect(userReducer(initialState, {type: LOGIN_USER_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      loginUserFailed: true,
      loginUserError: 'Error'
    });
  });

  it('should handle user logout request', () => {
    expect(userReducer(initialState, {type: LOGOUT_USER_REQUEST})).toEqual({...initialState, logoutUserRequest: true});
  });

  it('should handle user logout success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {type: LOGOUT_USER_SUCCESS})).toEqual({...initialState, logoutUserSuccess: true});
  });

  it('should handle user logout failed', () => {
    expect(userReducer(initialState, {type: LOGOUT_USER_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      logoutUserFailed: true,
      logoutUserError: 'Error'
    });
  });

  it('should handle load user request', () => {
    expect(userReducer(initialState, {type: USER_LOAD_DATA_REQUEST})).toEqual({...initialState, loadUserRequest: true});
  });

  it('should handle load user success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {type: USER_LOAD_DATA_SUCCESS, payload: {user: user}})).toEqual({
      ...initialState,
      user: user
    });
  });

  it('should handle load user failed', () => {
    expect(userReducer(initialState, {type: USER_LOAD_DATA_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      loadUserFailed: true,
      loadUserError: 'Error'
    });
  });

  it('should handle save user request', () => {
    expect(userReducer(initialState, {type: USER_SAVE_REQUEST})).toEqual({...initialState, saveUserRequest: true});
  });

  it('should handle save user success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {type: USER_SAVE_SUCCESS, payload: {user: user}})).toEqual({
      ...initialState,
      user: user
    });
  });

  it('should handle save user failed', () => {
    expect(userReducer(initialState, {type: USER_SAVE_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      saveUserFailed: true,
      saveUserError: 'Error'
    });
  });

  it('should handle forgot password request', () => {
    expect(userReducer(initialState, {type: FORGOT_PASSWORD_REQUEST})).toEqual({
      ...initialState,
      forgotPasswordRequest: true
    });
  });

  it('should handle forgot password success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {type: FORGOT_PASSWORD_SUCCESS})).toEqual({
      ...initialState,
      forgotPasswordSuccess: true
    });
  });

  it('should handle forgot password failed', () => {
    expect(userReducer(initialState, {type: FORGOT_PASSWORD_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      forgotPasswordFailed: true,
      forgotPasswordError: 'Error'
    });
  });

  it('should handle reset password request', () => {
    expect(userReducer(initialState, {type: RESET_PASSWORD_REQUEST})).toEqual({
      ...initialState,
      resetPasswordRequest: true
    });
  });

  it('should handle reset password success', () => {

    const user: TUser = {name: 'User', email: 'user@user.com'};

    expect(userReducer(initialState, {type: RESET_PASSWORD_SUCCESS})).toEqual({
      ...initialState,
      resetPasswordSuccess: true
    });
  });

  it('should handle reset password failed', () => {
    expect(userReducer(initialState, {type: RESET_PASSWORD_FAILED, payload: 'Error'})).toEqual({
      ...initialState,
      resetPasswordFailed: true,
      resetPasswordError: 'Error'
    });
  });

  it('should handle user clear error', () => {
    expect(userReducer({
      ...initialState,
      loginUserError: 'Error',
      registerUserError: 'Error',
      loadUserError: 'Error',
      forgotPasswordError: 'Error',
      resetPasswordError: 'Error',
      saveUserError: 'Error',
      logoutUserError: 'Error'
    }, {type: USER_CLEAR_ERROR})).toEqual(initialState);
  });
});