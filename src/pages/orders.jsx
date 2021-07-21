import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header';
import {useDispatch, useSelector} from 'react-redux';
import OrdersItem from '../components/orders-item/orders-item';
import orders from '../utils/default-data';
import {getIngredients} from '../services/actions/ingredients';
import ProfileMenu from '../components/profile-menu/profile-menu';

export function OrdersPage() {
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
        <main className={`${styles.profile} mt-10`}>
            <span className='mt-20'>
                <ProfileMenu decription={'В этом разделе вы можете просмотреть свою историю заказов'} />
            </span>
            <section className={styles.scrollable}>
                {orders.map((item) => (
                    <OrdersItem key={item.id} onClick={() => { history.push({ pathname: `/profile/orders/${item.id}`});}} showStatus={true} {...item} />
                ))}
            </section>
        </main>
      </div>
    );
}
