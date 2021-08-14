import React, {SyntheticEvent, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import styles from './profile.module.css';
import {useDispatch, useSelector} from '../services/hooks';
import OrdersItem from '../components/orders-item/orders-item';
import ProfileMenu from '../components/profile-menu/profile-menu';
import {WS_ORDERS_CONNECTION_START} from '../services/actions/wsOrdersActions';
import {CLEAR_ORDER_DETAIL, SET_ORDER_DETAIL} from '../services/actions/order';
import Modal from '../components/modal/modal';
import Order from '../components/order/order';
import {TOrder} from "../services/types/data";

export function OrdersPage() {
    const { orders } = useSelector(store => store.orders);
    const { order } = useSelector(store => store.order);
    const dispatch = useDispatch();
    const location = useLocation();

    const showDetails = (details: TOrder) => (e: SyntheticEvent) => {
        dispatch({type: SET_ORDER_DETAIL, payload: details});
        history.push({ pathname: `/profile/orders/${details.number}` , state: {background: location}});

        e.stopPropagation();
    }

    const hideDetails = (e: SyntheticEvent) => {
        dispatch({type: CLEAR_ORDER_DETAIL});
        history.goBack();

        e.stopPropagation();
    }

    useEffect(
        () => {
            dispatch({type: WS_ORDERS_CONNECTION_START});
        },
        [dispatch]
    );
    const history = useHistory();

    return (
      <>
        <main className={`${styles.profile} mt-10`}>
            <span className='mt-20'>
                <ProfileMenu decription={'В этом разделе вы можете просмотреть свою историю заказов'} />
            </span>
            <section className={styles.scrollable}>
                {orders ? orders.map((item) => (
                    <OrdersItem key={item._id} onClick={showDetails(item)} showStatus={true} id={item._id} date={item.createdAt} total={0} number={item.number} createdAt={item.createdAt} ingredients={item.ingredients} name={item.name} status={item.status} />
                )): <span className='text_type_main-medium'>Нет созданных заказов</span>}
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
