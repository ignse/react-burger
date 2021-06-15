import React from 'react';
import PropTypes from 'prop-types';
import styles from '../ingredient-details/ingredient_details.module.css';

class IngredientDetails extends React.Component {
    render()
    {
        const {ingredient} = this.props;

        const options = [
            {field: 'calories', title: 'Калории,ккал'},
            {field: 'proteins', title: 'Белки, г'},
            {field: 'fat', title: 'Жиры, г'},
            {field: 'carbohydrates', title: 'Углеводы, г'}
        ];

        return (
            <section>
                <span className={styles.image}>
                    <img src={ingredient.image} alt={ingredient.name}/>
                </span>

                <p className={`${styles.name} text text_type_main-default mt-4`}>
                    {ingredient.name}
                </p>
                <section className={`${styles.line} mb-15 mt-8`}>
                    {options.map((option) => (
                        <span key={option.field} className={`${styles.info} text text_type_main-default`}>
                            {option.title}
                            <p className='text text_type_main-medium'>{ingredient[option.field]}</p>
                        </span>
                    ))}
                </section>
            </section>
        );
    }
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }).isRequired
}

export default IngredientDetails;