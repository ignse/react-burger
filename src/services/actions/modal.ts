export const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';

export interface IShowOrderDetailsAction {
	readonly type: typeof SHOW_ORDER_DETAILS;
}

export interface IHideOrderDetailsAction {
	readonly type: typeof HIDE_ORDER_DETAILS;
}

export interface IShowIngredientDetailsAction {
	readonly type: typeof SHOW_INGREDIENT_DETAILS;
}

export interface IHideIngredientDetailsAction {
	readonly type: typeof HIDE_INGREDIENT_DETAILS;
}

export type TModalActions =
	| IShowOrderDetailsAction
	| IHideOrderDetailsAction
	| IShowIngredientDetailsAction
	| IHideIngredientDetailsAction;
