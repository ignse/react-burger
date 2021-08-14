import {TIngredient} from "../types/data";

export const SET_INGREDIENT_DETAIL = 'SET_INGREDIENT_DETAIL';
export const CLEAR_INGREDIENT_DETAIL = 'CLEAR_INGREDIENT_DETAIL';

export interface IClearIngredientAction {
	readonly type: typeof CLEAR_INGREDIENT_DETAIL;
}

export interface ISetIngredientAction {
	readonly type: typeof SET_INGREDIENT_DETAIL;
	readonly payload: TIngredient;
}

export type TDetailIngredientActions =
	| IClearIngredientAction
	| ISetIngredientAction;
