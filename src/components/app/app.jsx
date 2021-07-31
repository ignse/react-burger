import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/routes';
import {getIngredients} from '../../services/actions/ingredients';
import {useDispatch, useSelector} from 'react-redux';

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
            <Routes />
        </Router>
    );
}

export default App;