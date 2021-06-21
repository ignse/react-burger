import React, {useContext, useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import Ingredient from '../ingredients-list/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {IngredientsContext} from '../../services/ingredientsContext';

function BurgerIngredients() {

    const {ingredientsState} = useContext(IngredientsContext);

    const [state, setState] = useState({
        activeTab: 'bun',
        selectedIngredient: null,
        types : [
            {name: 'bun', title: 'Булки', ref: React.createRef()},
            {name: 'main', title: 'Начинки', ref: React.createRef()},
            {name: 'sauce', title: 'Соусы', ref: React.createRef()}
        ]
    });

    const showDetails = details => (e) => {
        setState({...state, selectedIngredient: details})

        e.stopPropagation();
    }

    const hideDetails = e => {
        setState({...state, selectedIngredient: null});

        e.stopPropagation();
    }

    const setCurrent = tabName => () => {
        if (ingredientsState.data.length)
        {
            setState({...state, activeTab: tabName});

            state.types.filter(item => item.name === tabName)[0].ref.current.scrollIntoView();
        }
    }

    return (
        <>
            <section className={`${styles.block} mt-10 ml-5`}>
                <section>
                    <p className='text text_type_main-large'>
                        Соберите бургер
                    </p>
                    <div style={{ display: 'flex' }}>
                        {state.types.map((item) => (
                            <Tab key={item.name} value={item.name} active={state.activeTab === item.name} onClick={setCurrent(item.name)}>
                                {item.title}
                            </Tab>
                        ))}
                    </div>
                </section>
                <section className={styles.scrollable}>
                    {ingredientsState.data.length ? state.types.map((item) => (
                        <IngredientsList key={item.name} sectionRef={item.ref} title={item.title} name={item.name}>
                            {ingredientsState.data.map((ingridient, index) => ingridient.type === item.name && ingridient && <Ingredient key={index} data={ingridient} onShowDetails={showDetails(ingridient)} />)}
                        </IngredientsList>
                    )) : (ingredientsState.loading && !ingredientsState.hasError ? 'Загрузка...' : 'Произошла ошибка, попробуйте перезагрузить страницу.')}
                </section>
            </section>
            {state.selectedIngredient && (
                <Modal header={'Детали ингредиента'} onClose={hideDetails}>
                    <IngredientDetails ingredient={state.selectedIngredient}/>
                </Modal>
            )}
        </>
    );
}

 export default BurgerIngredients;