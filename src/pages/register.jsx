import React, {useCallback, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import styles from './home.module.css';
import AppHeader from '../components/app-header/app-header';
import {
    Logo,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, registerUser, USER_CLEAR_ERROR} from '../services/actions/user';
import Modal from '../components/modal/modal';

export function RegisterPage() {

    const [form, setValue] = useState({ email: '', password: '', name: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const { user } = useSelector(store => store);

    const dispatch = useDispatch();

    const register = useCallback(
        e => {
            e.preventDefault();
            dispatch(registerUser(form));
        },
        [form, dispatch]
    );

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

    if (user.name) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }
  return (
      <div className={styles.content}>
        <AppHeader />
        <main className={`${styles.auth} ml-10 mt-10`}>
            <Logo />
            <p className="text text_type_main-default mt-10">
               Регистрация
            </p>
            {user.registerUserError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{user.registerUserError}</p></Modal>)}
            <span className='mt-5 textbox'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    size={'default'}
                    name={'name'}
                    onChange={onChange}
                />
            </span>
            <span className='mt-5 textbox'>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    size={'default'}
                    name={'email'}
                    onChange={onChange}
                />
            </span>
            <span className='mt-5 textbox'>
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    size={'default'}
                    icon={'ShowIcon'}
                    name={'password'}
                    onChange={onChange}
                />
            </span>
            <span className='mt-5'>
                <Button onClick={register}>Зарегистрироваться</Button>
            </span>
            <p className="text text_type_main-default mt-10 ml-4">
                Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
            </p>
        </main>
      </div>
  );
}
