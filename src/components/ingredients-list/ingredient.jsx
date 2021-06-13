import React from 'react'
import PropTypes from 'prop-types'
import styles from './ingredients_list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';

class Ingredient extends React.Component {

	state = {
		detailsVisible: false
	}

	showDetails = e => {
		if (this.state.detailsVisible) {
			this.hideDetails(e);
		}
		else {
			this.setState({detailsVisible: true})
		}
	}

	hideDetails = e => {
		this.setState({detailsVisible: false});

		e.stopPropagation();
	}

	render()
  {
      const {data} = this.props;

      return (
        <section className={`${styles.ingredient} mt-6`} onClick={this.showDetails}>
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
            {this.state.detailsVisible && (<IngredientDetails ingredient={data} onClose={this.hideDetails}/>)}
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