import {TIngredient} from "../types/data";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CART = 'CLEAR_CART';

export interface IClearCartAction {
	readonly type: typeof CLEAR_CART;
}

export interface IAddIngredientAction {
	readonly type: typeof ADD_INGREDIENT;
	readonly data: TIngredient;
}

export interface IDeleteIngredientAction {
	readonly type: typeof DELETE_INGREDIENT;
	readonly payload: number;
}

export interface IMoveIngredientAction {
	readonly type: typeof MOVE_INGREDIENT;
	readonly payload: { currentIndex: number, newIndex: number } ;
}

export type TCartActions =
	| IClearCartAction
	| IAddIngredientAction
	| IDeleteIngredientAction
	| IMoveIngredientAction;
