import React, { SyntheticEvent, useCallback} from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerItem from '../burger-item/burger-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from '../../services/hooks';
import {useDrop} from 'react-dnd';
import {ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT} from '../../services/actions/cart';
import {HIDE_ORDER_DETAILS, SHOW_ORDER_DETAILS} from '../../services/actions/modal';
import {MAKE_ORDER_INVALID, makeOrder} from '../../services/actions/order';
import {useHistory, useLocation} from 'react-router-dom';
import {TIngredient} from "../../services/types/data";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const { bun, items, total } = useSelector(store => store.cart);
    const { orderNumber, orderInvalid} = useSelector(store => store.order);
    const { orderDetailsVisible } = useSelector(store => store.modal);
    const { user } = useSelector(store => store.user);

    const history = useHistory();
    const location = useLocation();

    const handleDrop = (data: TIngredient) => {
           dispatch({
               type: ADD_INGREDIENT,
               data
           });
    };

    const handleDelete = (index: number) => {
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

    const showDetails = () => {
        const ingredients = items.map(item => item._id);

        const isValid = ingredients.length && bun && user.name;

        if (bun)
        {
            ingredients.push(bun._id);
        }

        if (isValid) {
            dispatch(makeOrder(ingredients));
        }
        else {
            dispatch({type: MAKE_ORDER_INVALID});
            dispatch({type: SHOW_ORDER_DETAILS});
        }
    }

    function hideDetails(e: SyntheticEvent) {
         dispatch({type: HIDE_ORDER_DETAILS});

         if (!user.name) {
             history.push({ pathname: `/login`, state: {from: location}});
         }

        e.stopPropagation();
    }

    return (
        <section className={`${styles.list} mt-25`} ref={dropTarget}>
            {bun && (<BurgerItem
                type="top"
                isLocked={true}
                data={bun}
                index={0}
                handleMove={() => {}}
            />)}

            {items && <section className={styles.scrollable}>
                {items.map((item, index) => (<BurgerItem key={item.key} id={item.key} data={item} index={index} handleDelete={handleDelete} handleMove={handleMove} />))}
            </section>}

            {bun && (<BurgerItem
                type="bottom"
                isLocked={true}
                data={bun}
                index={0}
                handleMove={() => {}}
            />)}

            <section className={`${styles.total} mt-10 mr-10 pr-3`}>
                <p className={`${styles.total_text} text text_type_digits-medium`}>
                    {total}&nbsp;<span><CurrencyIcon type="primary" /></span>
                </p>
                <span className={`${styles.total_text} ml-10`}>
                    <Button type="primary" size="medium" onClick={() => showDetails()}>
                        Оформить заказ
                    </Button>
                </span>
            </section>
            {orderDetailsVisible && orderNumber && !orderInvalid && (
                <Modal onClose={hideDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {orderDetailsVisible && !orderNumber && !orderInvalid && (
                <Modal onClose={hideDetails}>
                   <p className='text text_type_main-medium mb-15'>
                       Ошибка при оформлении заказа!
                   </p>
                </Modal>
            )}
            {orderDetailsVisible && orderInvalid && (
                <Modal onClose={hideDetails}>
                    <p className='text text_type_main-medium mb-15 ml-15 mt-5'>
                        Только авторизированный пользователь может создать заказ! Наличие булок и минимум одного ингридиента обязательно!
                    </p>
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;