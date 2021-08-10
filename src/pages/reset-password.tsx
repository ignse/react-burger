import React, {BaseSyntheticEvent, useCallback, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import styles from './home.module.css';
import {
  Logo,
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from '../services/hooks';
import {resetPassword, USER_CLEAR_ERROR} from '../services/actions/user';
import Modal from '../components/modal/modal';

export function ResetPasswordPage() {

    const { forgotPasswordSuccess, resetPasswordSuccess, resetPasswordError } = useSelector(store => store.user);

    const initialState: {password: string; token: string} = { password: '', token: ''};
    const [form, setValue] = useState(initialState);

    const onChange = (e: BaseSyntheticEvent) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

    const dispatch = useDispatch();

    const resetHandler = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword(form));
        },
        [form, dispatch]
    );

    if (resetPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    if (!forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }

  return (
      <form onSubmit={resetHandler}>
        <main className={`${styles.auth} ml-10 mt-10`}>
          <Logo />
          <p className="text text_type_main-default mt-10">
            Восстановление пароля
          </p>
            {resetPasswordError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{resetPasswordError}</p></Modal>)}

            <span className='mt-5 textbox'>
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    size={'default'}
                    value={form.password}
                    name={'password'}
                    onChange={onChange}
                />
            </span>
            <span className='mt-5 textbox'>
                 <Input
                     type={'text'}
                     placeholder={'Введите код из письма'}
                     size={'default'}
                     value={form.token}
                     name={'token'}
                     onChange={onChange}
                 />
          </span>
          <span className='mt-5'>
            <Button>Сохранить</Button>
          </span>
        </main>
        <p className="text text_type_main-default mt-10 ml-4">
            Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
  );
}