import React, {useCallback, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import styles from './home.module.css';
import {
  Logo,
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword, USER_CLEAR_ERROR} from '../services/actions/user';
import Modal from '../components/modal/modal';

export function ForgotPasswordPage() {

    const { forgotPasswordSuccess, forgotPasswordError } = useSelector(store => store.user);

    const [form, setValue] = useState({ email: ''});

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

    const dispatch = useDispatch();

    const forgotHandler = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword(form));
        },
        [form, dispatch]
    );

    if (forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
    }

  return (
      <form onSubmit={forgotHandler}>
        <main className={`${styles.auth} ml-10 mt-10`}>
          <Logo />
          <p className="text text_type_main-default mt-10">
            Восстановление пароля
          </p>
            {forgotPasswordError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{forgotPasswordError}</p></Modal>)}

            <span className='mt-5 textbox'>
                <Input
                    type={'email'}
                    placeholder={'Укажите E-mail'}
                    size={'default'}
                    value={form.email}
                    name={'email'}
                    onChange={onChange}
                />
          </span>
          <span className='mt-5'>
            <Button>Восстановить</Button>
          </span>
        </main>
        <p className="text text_type_main-default mt-10 ml-4">
            Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </form>
  );
}