import React, {useState, useCallback, BaseSyntheticEvent} from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';
import styles from './home.module.css';

import {
    Logo,
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from '../services/hooks';
import {loginUser, USER_CLEAR_ERROR} from '../services/actions/user';
import Modal from '../components/modal/modal';
import {getCookie} from '../utils/cookie';

export function LoginPage() {

    const initialState: {email: string; password: string} = { email: '', password: '' };
    const [form, setValue] = useState(initialState);

    const location = useLocation<Location & {from: string}>();

    const onChange = (e: BaseSyntheticEvent) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const { loginUserError} = useSelector(store => store.user);

    const dispatch = useDispatch();

    const login = useCallback(
        e => {
            e.preventDefault();
            dispatch(loginUser(form));
        },
        [form, dispatch]
    );

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

    if (getCookie('accessToken')) {
        return (
            <Redirect
                to={ location.state?.from || '/' }
            />
        );
    }

    return (
      <form onSubmit={login}>
        <main className={`${styles.auth} ml-10 mt-10`}>
          <Logo />
          <p className="text text_type_main-default mt-10">
            Вход
          </p>
          {loginUserError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{loginUserError}</p></Modal>)}
          <span className='mt-5 textbox'>
                <Input
                    type={'text'}
                    name={'email'}
                    placeholder={'E-mail'}
                    size={'default'}
                    value={form.email}
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
                    value={form.password}
                    onChange={onChange}
                />
            </span>
          <span className='mt-5'>
                <Button>Войти</Button>
          </span>
        </main>
        <p className="text text_type_main-default mt-10 ml-4">
            Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default mt-2 ml-4">
            Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
      </form>
  );
}