import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/routes';
import {getIngredients} from '../../services/actions/ingredients';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../app-header/app-header';
import styles from '../../pages/home.module.css';

function App() {
    const { items } = useSelector(store => store.ingredients);
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (!items.length) {
                dispatch(getIngredients());
            }
        },
        [dispatch, items.length]
    );

    return (
        <Router>
            <div className={styles.content}>
                <AppHeader />
                <Routes />
            </div>
        </Router>
    );
}

export default App;