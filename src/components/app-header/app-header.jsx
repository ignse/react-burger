import React from 'react';
import {Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderBtn from './header-button';

class AppHeader extends React.Component {
    render() {
        return (
           <header className={`${styles.header} pb-4`}>
               <nav className={styles.nav}>
                   <HeaderBtn icon={<BurgerIcon/>} text={'Конструктор'}/>
                   <span className='mr-2' />
                   <HeaderBtn icon={<ListIcon/>} text={'Лента заказов'}/>
               </nav>
               <span className={styles.logo}>
                   <Logo />
               </span>
               <span className={styles.profile}>
                   <HeaderBtn icon={<ProfileIcon/>} text={'Личный кабинет'}/>
               </span>
           </header>
        );
    }
}

 export default AppHeader;