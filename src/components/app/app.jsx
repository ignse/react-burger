import React from 'react';
import styles from './app.module.css';
import defaultData from '../../utils/default-data';
import config from '../../utils/config';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends React.Component {

    state = {
        data: [],
        loading: true,
        hasError: false
    }

    getIngredientsData = async () => {
        await fetch(config.apiUrl + '/api/ingredients')
            .then(res => res.json())
            .then(data => this.setState({ data: data.data, loading: false }))
            .catch(e => this.setState({ ...this.state, loading: false, hasError: true }))
    }

    componentDidMount() {
        this.getIngredientsData()
    }

    render() {
      return (
        <div className={styles.content}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients {...this.state} />
                <BurgerConstructor data={defaultData} />
            </main>
        </div>
      );
  }
}

export default App;