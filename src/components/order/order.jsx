import React from 'react';
import styles from '../order/order.module.css'
import img from '../../images/done.png'
import {useSelector} from 'react-redux';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {getStatusName, reformatDate} from '../../utils/functions';
import PropTypes from 'prop-types';

function Order(props) {
    const { order } = props;
    const { items } = useSelector(store => store.ingredients);

    let total = 0;
    let hasBun = false;

    return (
        order && <main className={`${styles.order} ml-10 mt-10`}>
            <span className={`${styles.number} text_type_digits-default`}>
                #{order.number}
            </span>
            <span className='text text_type_main-medium mt-10'>
               {order.name}
            </span>
            <span className={`text_type_main-default mt-3 text_color_success ${order.status === 'done' ? styles.text_color_success : ''}`}>
                {getStatusName(order.status)}
            </span>
            <span className='text_type_main-medium mt-15 mb-2'>
                Состав:
            </span>
            <span className={styles.scrollable}>
            {order.ingredients.map(ingredientId => {
                const ingredient = items.find(item => item._id === ingredientId);
                if (ingredient === null || typeof ingredient === "undefined") {
                    return '';
                }
                total += ingredient ? (ingredient.type === 'bun' ? (hasBun ? 0 : 2) : 1) * ingredient.price : 0;

                if (ingredient.type === 'bun') {
                    if (hasBun) {
                        return '';
                    }

                    hasBun = true;
                }

                return (ingredient && (
                    <div key={Math.random()} className={`${styles.line} mt-4`} >
                        <div className={styles.pict}>
                            <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
                        </div>
                        <span className={`${styles.name} ml-4 text_type_main-default`}>{ingredient.name}</span>
                        <span className={`${styles.price} ml-4 text_type_digits-default`}>{ingredient.type === 'bun' ? 2 : 1} x {ingredient.price}&nbsp;<CurrencyIcon type={'primary'} /></span>
                    </div>
                ))
            })}
            </span>
            <span className={`${styles.total} mt-10`}>
                <span className='text_type_main-default text_color_inactive'>{reformatDate(order ? order.createdAt : null)}</span>
                <span className={`${styles.price} text_type_digits-default`}>{total} &nbsp;<CurrencyIcon type={'primary'} /></span>
            </span>
        </main>
    );
}

Order.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number,
        name: PropTypes.string,
        status: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
        createdAt: PropTypes.string
    }).isRequired
};


export default Order;