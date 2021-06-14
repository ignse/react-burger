import React from 'react'
import PropTypes from 'prop-types'
import styles from './ingredients_list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

class Ingredient extends React.Component {
  render()
  {
      const {data, onShowDetails} = this.props;

      return (
        <section id={data._id} className={`${styles.ingredient} mt-6`} onClick={onShowDetails}>
          {data.count && <span className={styles.counter}><Counter count={data.count} size='default'/></span>}
            <span className={styles.image}>
                <img src={data.image} alt={data.name}/>
            </span>

            <p className={`${styles.price} text text_type_digits-medium`}>
              {data.price}&nbsp;<span><CurrencyIcon type="primary" /></span>
            </p>

            <p className={`${styles.name} text text_type_main-default`}>
              {data.name}
            </p>
        </section>
      )
  }
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        count: PropTypes.number
    }).isRequired,
    onShowDetails: PropTypes.func
};

export default Ingredient;