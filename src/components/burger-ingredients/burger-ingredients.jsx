import React, { useState, useEffect, useRef, useCallback} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import Ingredient from '../ingredients-list/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from '../../services/actions/modal';
import {CLEAR_INGREDIENT_DETAIL, SET_INGREDIENT_DETAIL} from '../../services/actions/inrgedientInfo';

function BurgerIngredients() {

    const [state, setState] = useState({
        activeTab: 'bun',
        types : [
            {name: 'bun', title: 'Булки', ref: React.createRef()},
            {name: 'main', title: 'Начинки', ref: React.createRef()},
            {name: 'sauce', title: 'Соусы', ref: React.createRef()}
        ]
    });

    const dispatch = useDispatch();

    const { items, itemsRequest, itemsFailed } = useSelector(store => store.ingredients);
    const { ingredient } = useSelector(store => store.info);

    useEffect(
        () => {
            if (!items.length) {
                dispatch(getIngredients());
            }
        },
        [dispatch, items.length]
    );

    const containerRef = useRef(null);

    const handleScroll = useCallback(() => {
        let activeTab = '';
        let min = 0;

        state.types.forEach(item => {
           const top = +item.ref.current.getBoundingClientRect().top;

           if (activeTab === '' && top > 0) {
               activeTab = item.name;
               min = top;
           }

           if (top < min && top > 0) {
               activeTab = item.name;
               min = top;
           }
        });

        if (activeTab) {
            setState({...state, activeTab: activeTab});
        }
    }, [state]);

    const showDetails = details => (e) => {
        dispatch({type: SET_INGREDIENT_DETAIL, payload: details});
        dispatch({type: SHOW_INGREDIENT_DETAILS});

        e.stopPropagation();
    }

    const hideDetails = e => {
        dispatch({type: CLEAR_INGREDIENT_DETAIL});
        dispatch({type: HIDE_INGREDIENT_DETAILS});

        e.stopPropagation();
    }

    const setCurrent = tabName => () => {
        if (items.length)
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
                <section className={styles.scrollable} onScroll={handleScroll} ref={containerRef}>
                    {items.length ? state.types.map((item) => (
                        <IngredientsList key={item.name} sectionRef={item.ref} title={item.title} name={item.name}>
                            {items.map((ingredient, index) => ingredient.type === item.name && ingredient && <Ingredient key={index} data={ingredient} onShowDetails={showDetails(ingredient)} />)}
                        </IngredientsList>
                    )) : (itemsRequest && !itemsFailed ? 'Загрузка...' : 'Произошла ошибка, попробуйте перезагрузить страницу.')}
                </section>
            </section>
            {ingredient.name && (
                <Modal header={'Детали ингредиента'} onClose={hideDetails}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
        </>
    );
}

 export default BurgerIngredients;