import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import {getIngredients} from '../services/actions/ingredients';

export function IngredientPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { items } = useSelector(store => store.ingredients);
    const ingredient = items.find(item => item._id === id);

    useEffect(
        () => {
            if (!items.length) {
                dispatch(getIngredients());
            }
        },
        [dispatch, items.length]
    );

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