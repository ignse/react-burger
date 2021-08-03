import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './home.module.css';
import {useSelector} from 'react-redux';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

export function IngredientPage() {
    const { id } = useParams();
    const { items } = useSelector(store => store.ingredients);
    const ingredient = items.find(item => item._id === id);

    return (
        <main className={`${styles.auth} ml-10 mt-10`}>
            <p className='text text_type_main-large'>Детали ингредиента</p>
            {ingredient && (<IngredientDetails ingredient={ingredient} />)}
        </main>
  );
}