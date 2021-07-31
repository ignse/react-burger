import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import {useSelector} from 'react-redux';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

export function IngredientPage() {
    const { id } = useParams();
    const { items } = useSelector(store => store.ingredients);
    const ingredient = items.find(item => item._id === id);

    return (
      <div className={styles.content}>
        <AppHeader />
        <main className={`${styles.auth} ml-10 mt-10`}>
            <p className='text text_type_main-large'>Детали ингредиента</p>
            {ingredient && (<IngredientDetails ingredient={ingredient} />)}
        </main>
      </div>
  );
}