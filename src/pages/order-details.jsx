import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import AppHeader from '../components/app-header/app-header';
import Order from '../components/order/order';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_ORDER_DETAIL, getOrder} from '../services/actions/order';

export function OrderPage() {
    const { id } = useParams();

    const { order } = useSelector(store => store.order);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getOrder(id));
        return () => dispatch({type: CLEAR_ORDER_DETAIL});
    }, []);

    return (
      <div className={styles.content}>
        <AppHeader />
        <Order order={order} />
      </div>
  )
}