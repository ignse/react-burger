import config from '../../utils/config';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function(dispatch) {
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