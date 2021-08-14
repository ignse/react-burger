import React, {useState, useRef, useCallback, SyntheticEvent} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import Ingredient from '../ingredients-list/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from '../../services/hooks';
import {HIDE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from '../../services/actions/modal';
import {CLEAR_INGREDIENT_DETAIL, SET_INGREDIENT_DETAIL} from '../../services/actions/inrgedientInfo';
import {useHistory, useLocation} from 'react-router-dom';
import {TIngredient} from "../../services/types/data";

const BurgerIngredients = () => {

    interface ITabs {
        activeTab: string
        types: Array<{ name: string; title: string; ref: any }>
    }

    const [state, setState] = useState<ITabs>({
        activeTab: 'bun',
        types : [
            {name: 'bun', title: 'Булки', ref: React.createRef<HTMLElement>()},
            {name: 'main', title: 'Начинки', ref: React.createRef<HTMLElement>()},
            {name: 'sauce', title: 'Соусы', ref: React.createRef<HTMLElement>()}
        ]
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const { items, itemsRequest, itemsFailed } = useSelector(store => store.ingredients);
    const { ingredient } = useSelector(store => store.info);

    const containerRef = useRef<HTMLElement>(null);

    const handleScroll = useCallback(() => {
        let activeTab = '';
        let min = 0;

        state.types.forEach(item => {
           const top = item.ref ? +item.ref?.current.getBoundingClientRect().top : 0;

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

    const showDetails = (details: TIngredient) => (e: SyntheticEvent) => {
        dispatch({type: SET_INGREDIENT_DETAIL, payload: details});
        dispatch({type: SHOW_INGREDIENT_DETAILS});
        history.push({ pathname: `/ingredients/${details._id}` , state: {background: location}});

        e.stopPropagation();
    }

    const hideDetails = (e: SyntheticEvent) => {
        dispatch({type: CLEAR_INGREDIENT_DETAIL});
        dispatch({type: HIDE_INGREDIENT_DETAILS});
        history.goBack();

        e.stopPropagation();
    }

    const setCurrent = (tabName: string) => () => {
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
            {ingredient && (
                <Modal header={'Детали ингредиента'} onClose={hideDetails}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
        </>
    );
}

 export default BurgerIngredients;