import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styles from '../../pages/profile.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, USER_CLEAR_ERROR} from '../../services/actions/user';
import Modal from '../modal/modal';

function ProfileMenu(props) {

    const { logoutUserSuccess , logoutUserError } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = useCallback(
        e => {
            e.preventDefault();
            dispatch(logoutUser());
        },
        [dispatch]
    );

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

    if (logoutUserSuccess) {
        history.push({ pathname: `/login`});
    }

    return (
        <nav className={`${styles.nav} mr-15`}>
            <NavLink className={`${styles.btn} mt-5 text text_type_main-medium`} to={'/profile'} exact activeClassName={styles.active} >
                Профиль
            </NavLink>
            <NavLink className={`${styles.btn} mt-5 text text_type_main-medium`} to={'/profile/orders'} exact activeClassName={styles.active}>
                История заказов
            </NavLink>
            <NavLink onClick={logout} className={`${styles.btn} mt-5 text text_type_main-medium`} to={''}>
                Выход
            </NavLink>
            <p className="text text_type_main-default mt-20 text_color_inactive">
                {props.decription}
            </p>
            {logoutUserError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{logoutUserError}</p></Modal>)}
        </nav>
    );
};

ProfileMenu.propTypes = {
    decription: PropTypes.string
};

export default ProfileMenu;