import React, {FC, MouseEventHandler} from 'react'
import styles from './ingredients_list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd';
import {TIngredient} from "../../services/types/data";

interface IIngredient {
    data: TIngredient;
    onShowDetails: MouseEventHandler<HTMLElement>;
};

const Ingredient: FC<IIngredient> = (props) => {

  const {data, onShowDetails} = props;

  const [{opacity}, dragRef] = useDrag({
      type: "ingredient",
      item: data,
      collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
      })
  });

  return (
    <section ref={dragRef} id={data._id} className={`${styles.ingredient} mt-6`} style={{opacity}} onClick={onShowDetails} >
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
  );
}

export default Ingredient;