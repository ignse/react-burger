import React, {useEffect, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styles from './feed.module.css';
import OrdersItem from '../components/orders-item/orders-item';
import {useDispatch, useSelector} from 'react-redux';
import {WS_FEED_CONNECTION_START} from '../services/actions/wsFeedActions';
import Modal from '../components/modal/modal';
import Order from '../components/order/order';
import {CLEAR_ORDER_DETAIL, SET_ORDER_DETAIL} from '../services/actions/order';

export function FeedPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const { orders, total, totalToday } = useSelector(store => store.feed);
    const { order } = useSelector(store => store.order);

    useEffect(
        () => {
                dispatch({type: WS_FEED_CONNECTION_START});
        },
        [dispatch]
    );

    const readyOrders = useMemo(() => {
        return orders.filter(order => order.status === 'done')
    }, [orders]);

    const inprocessOrders = useMemo(() => {
        return orders.filter(order => order.status === 'pending')
    }, [orders]);

    const showDetails = details => (e) => {
        dispatch({type: SET_ORDER_DETAIL, payload: details});
        history.push({ pathname: `/feed/${details.number}` , state: {background: location}});

        e.stopPropagation();
    }

    const hideDetails = e => {
        dispatch({type: CLEAR_ORDER_DETAIL});
        history.goBack();

        e.stopPropagation();
    }

    return (
      <>
        <span className={`${styles.title} text_type_main-large mt-10 mb-5`}>Лента заказов</span>
        <main className={`${styles.main}`}>
            <section className={styles.scrollable}>
                {orders.map((item) => (
                    <OrdersItem key={item._id} onClick={showDetails(item)} showStatus={false} {...item} />
                ))}
            </section>
            <section className={styles.info}>
                <section className={`${styles.statuses} ml-15`}>
                    <section className={styles.list}>
                        <span className={`${styles.caption} text_type_main-medium mb-6`}>Готовы:</span>
                        {readyOrders.map((order, index) => (
                            index < 10 && <span key={order.number} className={`${styles.ready} text_type_digits-default mb-2 mr-4`}>{order.number}</span>
                        ))}
                    </section>
                    <section className={styles.list}>
                        <span className='text_type_main-medium mb-6'>В работе:</span>
                        {inprocessOrders.map((order, index) => (
                            index < 10 && <span key={order.number} className='text_type_digits-default mb-2 text_color_success mr-4'>{order.number}</span>
                        ))}
                    </section>
                </section>
                <section className={`${styles.info} ml-15`}>
                    <span className='text_type_main-medium mt-15'>Выполнено за все время:</span>
                    <span className={`${styles.number} text text_type_digits-large`}>{total}</span>
                </section>
                <section className={`${styles.info} ml-15`}>
                    <span className='text_type_main-medium mt-15'>Выполнено за сегодня:</span>
                    <span className={`${styles.number} text text_type_digits-large`}>{totalToday}</span>
                </section>
            </section>
        </main>
          {order && (
              <Modal onClose={hideDetails}>
                  <Order order={order}/>
              </Modal>
          )}
      </>
    );
}
