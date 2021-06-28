import React, { useCallback } from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerItem from '../burger-item/burger-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from 'react-redux';
import {useDrop} from 'react-dnd';
import {ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CART} from '../../services/actions/cart';
import {HIDE_ORDER_DETAILS} from '../../services/actions/modal';
import {makeOrder} from '../../services/actions/order';

function BurgerConstructor() {
    const dispatch = useDispatch();

    const { bun, items, total } = useSelector(store => store.cart);
    const { orderNumber } = useSelector(store => store.order);
    const { orderDetailsVisible } = useSelector(store => store.modal);


    const handleDrop = (data) => {
           dispatch({
               type: ADD_INGREDIENT,
               data
           });
    };

    const handleDelete = index => (e) => {
        e.stopPropagation();
        dispatch({ type: DELETE_INGREDIENT, payload: index});

    };

    const handleMove = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            payload: {currentIndex: dragIndex, newIndex: hoverIndex}
        });
    }, [dispatch]);


    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop: handleDrop
    });


    function showDetails(e) {

        const ingredients = items.map(item => item._id);

        if (bun.name)
        {
            ingredients.push(bun._id);
        }

        dispatch(makeOrder(ingredients));

        e.stopPropagation();
    }

    function hideDetails(e) {
         dispatch({type: HIDE_ORDER_DETAILS});
         dispatch({type: CLEAR_CART});

        e.stopPropagation();
    }

    return (
        <section className={`${styles.list} mt-25`} ref={dropTarget}>
            {bun.name && (<BurgerItem
                type="top"
                isLocked={true}
                data={bun}
            />)}

            {items && <section className={styles.scrollable}>
                {items.map((item, index) => (<BurgerItem key={item.key} id={item.key} data={item} index={index} handleDelete={handleDelete(index)} handleMove={handleMove} />))}
            </section>}

            {bun.name && (<BurgerItem
                type="bottom"
                isLocked={true}
                data={bun}
            />)}

            <section className={`${styles.total} mt-10 mr-10 pr-3`}>
                <p className={`${styles.total_text} text text_type_digits-medium`}>
                    {total}&nbsp;<span><CurrencyIcon type="primary" /></span>
                </p>
                <span className={`${styles.total_text} ml-10`}>
                    <Button type="primary" size="medium" onClick={showDetails}>
                        Оформить заказ
                    </Button>
                </span>
            </section>
            {orderDetailsVisible && orderNumber && (
                <Modal onClose={hideDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {orderDetailsVisible && !orderNumber && (
                <Modal onClose={hideDetails}>
                   <p className='text text_type_main-medium mb-15'>
                       Ошибка при оформлении заказа!
                   </p>
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;