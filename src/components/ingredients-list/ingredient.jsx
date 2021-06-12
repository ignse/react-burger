import React from 'react'
import PropTypes from 'prop-types'
import styles from './ingredients_list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

class Ingredient extends React.Component {

  render()
  {
      return (
        <section className={`${styles.ingredient} mt-6`}>
          {this.props.data.count && <span className={styles.counter}><Counter count={this.props.data.count} size='default'/></span>}
            <span className={styles.image}>
                <img src={this.props.data.image} alt={this.props.data.name}/>
            </span>

            <p className={`${styles.price} text text_type_digits-medium`}>
              {this.props.data.price}&nbsp;<span><CurrencyIcon type="primary" /></span>
            </p>

            <p className={`${styles.name} text text_type_main-default`}>
              {this.props.data.name}
            </p>
        </section>
      )
  }
}

Ingredient.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        count: PropTypes.number
    }).isRequired
};

export default Ingredient;