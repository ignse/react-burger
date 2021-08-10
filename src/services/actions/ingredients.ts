import config from '../../utils/config';
import {AppDispatch, AppThunk} from "../types";
import {TIngredient} from "../types/data";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
}

export type TIngredientsActions =
    | IGetIngredientsAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(config.apiUrl + '/api/ingredients')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
      }))
      .catch(e => dispatch({
        type: GET_INGREDIENTS_FAILED
      }))
  };
}