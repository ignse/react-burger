import React from 'react';
import {Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderBtn from './header-button';
import {useSelector} from 'react-redux';

function AppHeader() {
    const { user } = useSelector(store => store.user);

    return (
       <header className={`${styles.header} pb-4`}>
           <nav className={styles.nav}>
               <HeaderBtn icon={<BurgerIcon />} path={'/'} exact={true} text={'Конструктор'}/>
               <span className='mr-2' />
               <HeaderBtn icon={<ListIcon />} path={'/feed'} text={'Лента заказов'}/>
           </nav>
           <span className={styles.logo}>
               <Logo />
           </span>
           <span className={styles.profile}>
               {!user.name && (<HeaderBtn icon={<ProfileIcon/>} path={'/login'} text={'Личный кабинет'}/>)}
               {user.name && (<HeaderBtn icon={<ProfileIcon/>} path={'/profile'} exact={false} text={user.name}/>)}
           </span>
       </header>
    );
}

 export default AppHeader;