import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CART, TCartActions
} from '../actions/cart';
import {TIngredient} from "../types/data";

type TCartState = {
  bun: TIngredient | null;
  items: Array<TIngredient>;
  count: number;
  total: number;
};

const initialState: TCartState = {
  bun: null,
  items: [],
  count: 0,
  total: 0,
};

export const cartReducer = (state = initialState, action: TCartActions): TCartState => {

  const calcTotal = (state: TCartState) => {
   return (state.items && state.items.length ? state.items.reduce((acc, p) => acc + p.price, 0) : 0)  + (state.bun ? state.bun.price *2 : 0);
  }

  const calcCount = (state: TCartState) => {
    return state.items.length + (state.bun ? 2 : 0);
  }

  switch (action.type) {
    case ADD_INGREDIENT: {

      const {data} = action;

      const newState = data.type === 'bun' ? {...state, bun: data} : {...state, items: [...state.items, {...data, key: Date.now().toString()}]};

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

      const newState: TCartState = {...state, items: state.items.filter((item, index) => index !== action.payload)};

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
