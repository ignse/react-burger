import React from 'react';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

export function HomePage() {
  return (
      <div className={styles.content}>
          <AppHeader />
          <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
              </DndProvider>
          </main>
      </div>
  );
}
