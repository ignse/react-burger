import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {useSelector} from './../../services/hooks';
import HeaderBtn from "./header-button";

const AppHeader = () => {
    const { user } = useSelector(store => store.user);

    return (
       <header className={`${styles.header} pb-4`}>
           <nav className={styles.nav}>
               <HeaderBtn icon={<BurgerIcon type='primary' />} path={'/'} exact={true} text={'Конструктор'}/>
               <span className='mr-2' />
               <HeaderBtn icon={<ListIcon type='primary' />} path={'/feed'} text={'Лента заказов'}/>
           </nav>
           <span className={styles.logo}>
               <Logo />
           </span>
           <span className={styles.profile}>
              <HeaderBtn icon={<ProfileIcon type='primary' />} path={'/profile'} exact={false} text={user.name ? user.name : 'Личный кабинет'}/>
           </span>
       </header>
    );
}

 export default AppHeader;