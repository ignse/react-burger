import React, {useEffect, useReducer, useState} from 'react';
import styles from './app.module.css';
import config from '../../utils/config';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {BurgerContext} from '../../services/burgerContext';
import {IngredientsContext} from '../../services/ingredientsContext';

const burgerInitialState = { total: 0, burger: [], orderDetailsVisible: false, orderNumber: 0};

function App() {

    const [ingredientsState, setIngredientsState] = useState({
        data: [],
        loading: true,
        hasError: false
    });

    const [burgerState, burgerDispatcher] = useReducer(reducer, burgerInitialState);

    function reducer(state, action) {

        switch (action.type) {
            case 'init':
                return {...state, burger: action.data};
            case 'total':
                return {...state, total: state.burger && state.burger.length ? state.burger.reduce((acc, p) => acc + p.price * (p.type ===  'bun' ? 2 : 1), 0) : 0};
            case 'showDetails':
                return {...state, orderDetailsVisible: true, orderNumber: action.number.toString()};
            case 'hideDetails':
                return {...state, orderDetailsVisible: false};
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    const getIngredientsData = async () => {
        await fetch(config.apiUrl + '/api/ingredients')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => setIngredientsState({ data: data.data, loading: false }))
            .catch(e => setIngredientsState({ ...this.state, loading: false, hasError: true }))
    }

    useEffect(() => {
        getIngredientsData()
    }, []);

    return (
        <div className={styles.content}>
            <AppHeader />
            <main className={styles.main}>
                <IngredientsContext.Provider value={{ ingredientsState, setIngredientsState }}>
                    <BurgerIngredients />
                    <BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
                        <BurgerConstructor />
                    </BurgerContext.Provider>
                </IngredientsContext.Provider>
            </main>
        </div>
    );
}

export default App;