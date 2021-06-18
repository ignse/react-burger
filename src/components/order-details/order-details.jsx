import React, {useContext} from 'react';
import styles from '../order-details/order-details.module.css'
import img from '../../images/done.png'
import {BurgerContext} from '../../services/burgerContext';

function OrderDetails() {
    const {burgerState} = useContext(BurgerContext);

    const {orderNumber} = burgerState;

    return (
        <section className={styles.details}>
            <p className={`${styles.number} text text_type_digits-large mt-4`}>
                {orderNumber}
            </p>
            <p className='text text_type_main-medium mt-8 mb-15'>
                идентификатор заказа
            </p>
            <span className={styles.image}>
                <img src={img} alt='done'/>
            </span>

            <span className={`${styles.confirm} text text_type_main-default mt-15`}>
                Ваш заказ начали готовить
                <p className={`${styles.info} mt-2 mb-30`} >
                    Дождитесь готовности на орбитальной станции
                </p>
            </span>
        </section>
    );
}

export default OrderDetails;