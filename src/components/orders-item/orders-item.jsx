import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-item.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';

function OrdersItem(props) {

    const {status, showStatus, name, number, createdAt, ingredients, onClick} = props;
    const { items } = useSelector(store => store.ingredients);
    let total = 0;
    let hasBun = false;

	const createDate = new Date(createdAt);
	const daysDiff = Math.ceil(Math.abs(new Date().getTime() - createDate.getTime())/ (1000*3600*24));
    let date = new Intl.DateTimeFormat('ru-ru',{
		timeZoneName: 'short',
		hour: '2-digit',
		minute: '2-digit'
	}).format(createDate);

	date = daysDiff === 0 ? 'Сегодня, ' : (daysDiff === 1 ? 'Вчера, ' : (daysDiff < 5 ? daysDiff + ' дня назад, ' : daysDiff + ' дней назад, ')) + date;

    return (
        <div className={styles.section} onClick={onClick}>
            <section className={`${styles.row} mt-6`}>
                <span className='text_type_digits-default ml-6'>#{number}</span>
                <span className='text_type_main-default text_color_inactive mr-6'>{date}</span>
            </section>
            <span className={`${styles.name} text_type_main-medium ml-6 mt-6`}>{name}</span>
            {showStatus && (<span className='text_type_main-default ml-6 mt-2 mb-6'>{status}</span>)}
            <section className={`${styles.footer} mt-6 mb-6`}>
                <div className={`${styles.picts} ml-6`}>
                    {ingredients.map((ingredientId, index) => {
                        const ingredient = items.find(item => item._id === ingredientId);
                        if (!ingredient) {
                        	return '';
						}
                        total += ingredient ? (ingredient.type === 'bun' ? (hasBun ? 0 : 2) : 1) * ingredient.price : 0;

                        if (ingredient.type === 'bun') {
                        	if (hasBun) {
                        		return '';
							}

                            hasBun = true;
                        }

                        return (index < 6 && (
                            <div key={Math.random()} className={styles.pict}>
                                <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
                                {index === 5 && ingredients.length > 6 && (<span className={`${styles.num} text_type_digits-default text_color_inactive`}>+{ingredients.length - 6}</span>)}
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