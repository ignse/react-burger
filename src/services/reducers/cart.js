import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CART
} from '../actions/cart';

const initialState = {
  bun: {},
  items: [],
  count: 0,
  total: 0,
};

export const cartReducer = (state = initialState, action) => {

  const calcTotal = state => {
   return (state.items && state.items.length ? state.items.reduce((acc, p) => acc + p.price, 0) : 0)  + (state.bun.name ? state.bun.price *2 : 0);
  }

  const calcCount = state => {
    return state.items.length + state.bun.name ? 2 : 0;
  }

  switch (action.type) {
    case ADD_INGREDIENT: {

      const {data} = action;

      const newState = data.type === 'bun' ? {...state, bun: data} : {...state, items: [...state.items, {...data, key: Date.now()}]};

      return {...newState, total: calcTotal(newState), count: calcCount(newState)};
    }
    case MOVE_INGREDIENT: {
      const { currentIndex, newIndex } = action.payload;

      const item = state.items[currentIndex];
      const newItems = [...state.items];

      newItems[currentIndex] = newItems[newIndex];
      newItems[newIndex] = item;

      return {...state, items: newItems};
    }
    case DELETE_INGREDIENT: {

      const newState = {...state, items: state.items.filter((item, index) => index !== action.payload)};

      return {...newState, total: calcTotal(newState), count: calcCount(newState)};
    }
    case CLEAR_CART: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
