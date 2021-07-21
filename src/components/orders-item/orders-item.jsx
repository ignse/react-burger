import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-item.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';

function OrdersItem(props) {

    const {status, showStatus, name, id, date, total, ingredients, onClick} = props;
    const { items } = useSelector(store => store.ingredients);

    return (
        <div className={styles.section} onClick={onClick}>
            <section className={`${styles.row} mt-6`}>
                <span className='text_type_digits-default ml-6'>#{id}</span>
                <span className='text_type_main-default text_color_inactive mr-6'>{date}</span>
            </section>
            <span className={`${styles.name} text_type_main-medium ml-6 mt-6`}>{name}</span>
            {showStatus && (<span className='text_type_main-default ml-6 mt-2 mb-6'>{status}</span>)}
            <section className={`${styles.footer} mt-6 mb-6`}>
                <div className={`${styles.picts} ml-6`}>
                    {ingredients.map(ingredientId => {
                        const ingredient = items.find(item => item._id === ingredientId);

                        return (ingredient && (
                            <div key={ingredientId} className={styles.pict}>
                                <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
                            </div>
                        ))
                    })}
                </div>
                <p className='text_type_digits-medium mr-6'>{total} <CurrencyIcon type={'primary'} /> </p>
            </section>
        </div>
    );
};

OrdersItem.propTypes = {
    status: PropTypes.string,
    showStatus: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
    total: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func
};

export default OrdersItem;