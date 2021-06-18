import React, {useContext, useEffect} from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerItem from '../burger-item/burger-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {BurgerContext} from '../../services/burgerContext';
import {IngredientsContext} from '../../services/ingredientsContext';
import config from '../../utils/config';

function BurgerConstructor() {
    const {ingredientsState} = useContext(IngredientsContext);
    const {burgerState, burgerDispatcher} = useContext(BurgerContext);

    function showDetails(e) {

        fetch(config.apiUrl + '/api/orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                ingredients: burgerState.burger.map(item => item._id)
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data =>  burgerDispatcher({type: 'showDetails', number: data.order.number}))
        .catch(e => burgerDispatcher({type: 'showDetails', number: ''}));

        e.stopPropagation();
    }

    function hideDetails(e) {
        burgerDispatcher({type: 'hideDetails'});

        e.stopPropagation();
    }

    function getRandomBurger() {
        let burger = [];
        let have_bun = false;

        if (ingredientsState.data.length === 0) {
            return burger;
        }

        for (let i = 0; i< 8; i++) {
            let item = ingredientsState.data[Math.floor(Math.random() * ingredientsState.data.length)];

            if (item.type === 'bun') {
                if (have_bun) {
                    continue;
                }

                have_bun = true;
            }

            burger.push(item);
        }

        return burger;
    }

    useEffect(()=>{
        burgerDispatcher({type: 'init', data: getRandomBurger()});
        burgerDispatcher({type: 'total'});
    }, [ingredientsState.data]);

    const bun = burgerState.burger ? burgerState.burger.filter(item => item.type === 'bun')[0] : [];

    const other = burgerState.burger ? burgerState.burger.filter(item => item.type !== 'bun') : [];

    return (
        <section className={`${styles.list} mt-25`}>
            {bun && <BurgerItem
                type="top"
                isLocked={true}
                data={bun}
            />}

            {other && <section className={styles.scrollable}>
                {other.map((item, index) => (<BurgerItem key={item._id + index} data={item} />))}
            </section>}

            {bun && <BurgerItem
                type="bottom"
                isLocked={true}
                data={bun}
            />}

            <section className={`${styles.total} mt-10 mr-10 pr-3`}>
                <p className={`${styles.total_text} text text_type_digits-medium`}>
                    {burgerState.total}&nbsp;<span><CurrencyIcon type="primary" /></span>
                </p>
                <span className={`${styles.total_text} ml-10`}>
                    <Button type="primary" size="medium" onClick={showDetails}>
                        Оформить заказ
                    </Button>
                </span>
            </section>
            {burgerState.orderDetailsVisible && burgerState.orderNumber && (
                <Modal onClose={hideDetails}>
                    <OrderDetails />
                </Modal>
            )}
            {burgerState.orderDetailsVisible && !burgerState.orderNumber && (
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