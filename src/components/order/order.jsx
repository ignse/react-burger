import React from 'react';
import styles from '../order/order.module.css'
import img from '../../images/done.png'
import {useSelector} from 'react-redux';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function Order(props) {
    const { order } = props;
    const { items } = useSelector(store => store.ingredients);

    const statuses = [];

    statuses['done'] = 'Выполнен';
    statuses['pending'] = 'В процессе';
    statuses['created'] = 'Создан';

    let total = 0;
    let hasBun = false;

    const createDate = new Date(order ? order.createdAt : null);
    const daysDiff = Math.ceil(Math.abs(new Date().getTime() - createDate.getTime())/ (1000*3600*24));
    let date = new Intl.DateTimeFormat('ru-ru',{
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(createDate);

    date = daysDiff === 0 ? 'Сегодня, ' : (daysDiff === 1 ? 'Вчера, ' : (daysDiff < 5 ? daysDiff + ' дня назад, ' : daysDiff + ' дней назад, ')) + date;


    return (
        order && <main className={`${styles.order} ml-10 mt-10`}>
            <span className={`${styles.number} text_type_digits-default`}>
                #{order.number}
            </span>
            <span className='text text_type_main-medium mt-10'>
               {order.name}
            </span>
            <span className={`text_type_main-default mt-3 text_color_success ${order.status === 'done' ? styles.text_color_success : ''}`}>
                {statuses[order.status]}
            </span>
            <span className='text_type_main-medium mt-15 mb-2'>
                Состав:
            </span>
            <span className={styles.scrollable}>
            {order.ingredients.map(ingredientId => {
                const ingredient = items.find(item => item._id === ingredientId);
                if (ingredient === null) {
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
                <span className='text_type_main-default text_color_inactive'>{date}</span>
                <span className={`${styles.price} text_type_digits-default`}>{total} &nbsp;<CurrencyIcon type={'primary'} /></span>
            </span>
        </main>
    );
}

export default Order;