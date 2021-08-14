import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TOrderActions } from '../actions/order';
import { TIngredientsActions } from '../actions/ingredients';
import { TUserActions } from '../actions/user';

type TApplicationActions = 
	| TUserActions
	| TOrderActions
	| TIngredientsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
