import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Order from '../components/order/order';
import {useDispatch, useSelector} from '../services/hooks';
import {CLEAR_ORDER_DETAIL, getOrder, IClearOrderDetailAction} from '../services/actions/order';

export function OrderPage() {
    const { id } = useParams<{id: string}>();

    const { order } = useSelector(store => store.order);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getOrder(id));
        return () => {dispatch({type: CLEAR_ORDER_DETAIL})};
    }, []);

    return (
        order && <Order order={order} />
  )
}