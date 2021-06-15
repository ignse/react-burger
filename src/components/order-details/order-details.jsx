import React from 'react';
import PropTypes from 'prop-types';
import styles from '../order-details/order-details.module.css'
import img from '../../images/done.png'

class OrderDetails extends React.Component {
    render()
    {
        const {orderNumber} = this.props;

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
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.string
}

export default OrderDetails;