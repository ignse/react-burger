import React, {FC} from 'react';
import styles from '../ingredient-details/ingredient_details.module.css';
import {TIngredient} from "../../services/types/data";

const IngredientDetails: FC<{ingredient: TIngredient}> = (props) => {

    const {ingredient} = props;

    return (
        <section>
            <span className={styles.image}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </span>

            <p className={`${styles.name} text text_type_main-default mt-4`}>
                {ingredient.name}
            </p>
            <section className={`${styles.line} mb-15 mt-8`}>
                 <span key='calories' className={`${styles.info} text text_type_main-default`}>
                    Калории,ккал
                    <p className='text text_type_main-medium'>{ingredient.calories}</p>
                 </span>
                 <span key='proteins' className={`${styles.info} text text_type_main-default`}>
                    Белки, г
                    <p className='text text_type_main-medium'>{ingredient.proteins}</p>
                 </span>
                 <span key='fat' className={`${styles.info} text text_type_main-default`}>
                    Жиры, г
                    <p className='text text_type_main-medium'>{ingredient.fat}</p>
                 </span>
                 <span key='carbohydrates' className={`${styles.info} text text_type_main-default`}>
                    Углеводы, г
                    <p className='text text_type_main-medium'>{ingredient.carbohydrates}</p>
                 </span>
            </section>
        </section>
    );
}

export default IngredientDetails;