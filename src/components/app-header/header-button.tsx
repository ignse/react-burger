import React, {FC} from 'react';
import styles from './app-header.module.css';
import {NavLink} from 'react-router-dom';
import {THeaderBtn} from "../../services/types/data";

const HeaderBtn: FC<THeaderBtn> = (props) => {
    return (
       <NavLink to={{ pathname: props.path}} exact={props.exact} activeClassName={styles.active} className={`${styles.btn} p-5`}>
           {props.icon}
           <span className='ml-2 text text_type_main-default'>{props.text}</span>
       </NavLink>
    );
}

export default HeaderBtn;