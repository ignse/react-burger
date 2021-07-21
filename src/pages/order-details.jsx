import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import AppHeader from '../components/app-header/app-header';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../services/actions/ingredients';
import orders from '../utils/default-data';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { items } = useSelector(store => store.ingredients);
    const order = orders.find(item => item.id === id);

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
        <main className={`${styles.order} ml-10 mt-10`}>
            <span className={`${styles.number} text_type_digits-default`}>
                #{order.id}
            </span>
            <span className='text text_type_main-medium mt-10'>
               {order.name}
            </span>
            <span className={`text_type_main-default mt-3 text_color_success ${order.status === 'Выполнен' ? styles.text_color_success : ''}`}>
                {order.status}
            </span>
            <span className='text_type_main-medium mt-15 mb-2'>
                Состав:
            </span>
            <span className={styles.scrollable}>
            {order.ingredients.map(ingredientId => {
                const ingredient = items.find(item => item._id === ingredientId);

                return (ingredient && (
                    <div key={ingredientId} className={`${styles.line} mt-4`} >
                        <div className={styles.pict}>
                            <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
                        </div>
                        <span className={`${styles.name} ml-4 text_type_main-default`}>{ingredient.name}</span>
                        <span className={`${styles.price} ml-4 text_type_digits-default`}>{ingredient.type === 'bun' ? 2 : 1} x {ingredient.price}&nbsp;<CurrencyIcon type={'primary'} /></span>
                    </div>
                ))
            })}
            </span>
            <span className={`${styles.total} mt-10`}>
                <span className='text_type_main-default text_color_inactive'>{order.date}</span>
                <span className={`${styles.price} text_type_digits-default`}>{order.total} &nbsp;<CurrencyIcon type={'primary'} /></span>
            </span>
        </main>
      </div>
  )
}