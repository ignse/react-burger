import React, { useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import styles from './feed.module.css';
import AppHeader from '../components/app-header/app-header';
import {useDispatch, useSelector} from 'react-redux';
import OrdersItem from '../components/orders-item/orders-item';
import orders from '../utils/default-data';
import {getIngredients} from '../services/actions/ingredients';

export function FeedPage() {
    const { items } = useSelector(store => store.ingredients);
    const dispatch = useDispatch();
    const history = useHistory();

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
        <span className={`${styles.title} text_type_main-large mt-10 mb-5`}>Лента заказов</span>
        <main className={`${styles.main}`}>
            <section className={styles.scrollable}>
                {orders.map((item) => (
                    <OrdersItem key={item.id} onClick={() => { history.push({ pathname: `/feed/${item.id}`});}} showStatus={false} {...item} />
                ))}
            </section>
            <section className={styles.info}>
                <section className={`${styles.statuses} ml-15`}>
                    <section className={styles.list}>
                        <span className='text_type_main-medium mb-6'>Готовы:</span>
                        <span className={`${styles.ready} text_type_digits-default mb-2`}>034533</span>
                        <span className={`${styles.ready} text_type_digits-default mb-2`}>034532</span>
                        <span className={`${styles.ready} text_type_digits-default mb-2`}>034530</span>
                        <span className={`${styles.ready} text_type_digits-default mb-2`}>034527</span>
                        <span className={`${styles.ready} text_type_digits-default mb-2`}>034525</span>
                    </section>
                    <section className={styles.list}>
                        <span className='text_type_main-medium mb-6'>В работе:</span>
                        <span className='text_type_digits-default mb-2 text_color_success'>034538</span>
                        <span className='text_type_digits-default mb-2 text_color_success'>034541</span>
                        <span className='text_type_digits-default mb-2 text_color_success'>034543</span>
                    </section>
                </section>
                <section className={`${styles.info} ml-15`}>
                    <span className='text_type_main-medium mt-15'>Выполнено за все время:</span>
                    <span className={`${styles.number} text text_type_digits-large`}>28 752</span>
                </section>
                <section className={`${styles.info} ml-15`}>
                    <span className='text_type_main-medium mt-15'>Выполнено за сегодня:</span>
                    <span className={`${styles.number} text text_type_digits-large`}>138</span>
                </section>
            </section>
        </main>
      </div>
    );
}
