import React from 'react';
import styles from './app.module.css';
import data from '../../utils/data';
import defaultData from '../../utils/default-data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


class App extends React.Component {
  render() {
      return (
        <div className={styles.content}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={defaultData} />
            </main>
        </div>
      );
  }
}

export default App;
