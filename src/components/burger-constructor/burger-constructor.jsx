import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerItem from '../burger-item/burger-item';
import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

class BurgerConstructor extends React.Component {
    render()
    {
        const bun = this.props.data.filter(item => item.type === 'bun')[0];

        const other = this.props.data.filter(item => item.type !== 'bun');

        const total = other.reduce((acc, p) => acc + p.price, 0) + bun.price * 2;

        return (
            <section className={`${styles.list} mt-25`}>
                <BurgerItem
                    type="top"
                    isLocked={true}
                    data={bun}
                />
                <section className={styles.scrollable}>
                    {other.map(item => (<BurgerItem key={item._id} data={item} />))}
                </section>
                <BurgerItem
                    type="bottom"
                    isLocked={true}
                    data={bun}
                />
                <section className={`${styles.total} mt-10 mr-10 pr-3`}>
                    <p className={`${styles.total_text} text text_type_digits-medium`}>
                        {total}&nbsp;<span><CurrencyIcon type="primary" /></span>
                    </p>
                    <span className={`${styles.total_text} ml-10`}>
                        <Button type="primary" size="medium">
                            Оформить заказ
                        </Button>
                    </span>
                </section>
            </section>
        );
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(Object)
};

export default BurgerConstructor;