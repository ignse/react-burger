import {rootReducer} from "../reducers";

export type TUser = {
  email: string;
  name: string;
};

export type TUserPass = TUser & {
  password: string;
};

export type TOrder = {
    number: string;
    name: string;
    status: string;
    ingredients: ReadonlyArray<string>;
    createdAt: string;
    _id: string;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    key?: string;
    count?: number;
};

export type THeaderBtn = {
    text: string;
    path: string;
    icon?: any;
    exact?: boolean;
};

export interface IEmptyAction {
    readonly type?: null;
}

export type RootState = ReturnType<typeof rootReducer>;