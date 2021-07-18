import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css';
import AppHeader from '../components/app-header/app-header';
import {
    Input,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, saveUser, USER_CLEAR_ERROR} from '../services/actions/user';
import Modal from '../components/modal/modal';
import ProfileMenu from '../components/profile-menu/profile-menu';

export function ProfilePage() {

    const [form, setValue] = useState({ email: '', password: '', name: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const { user } = useSelector(store => store);

    const dispatch = useDispatch();

    const save = useCallback(
        e => {
            e.preventDefault();
            dispatch(saveUser(form));
        },
        [form, dispatch]
    );

    const cancel = useCallback(
        e => {
            e.preventDefault();
            setValue(user.user)
        },
        [user.user]
    );

    useEffect(() => {

        dispatch(loadUser(setValue));
    }, [dispatch]);

    const closeError = () => {
        dispatch({type: USER_CLEAR_ERROR});
    }

  return (
      <div className={styles.content}>
        <AppHeader />
        <main className={`${styles.profile} mt-30`}>
            {user.loadUserError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{user.loadUserError}</p></Modal>)}
            {user.saveUserError && (<Modal header={'Ошибка'} onClose={closeError}><p className={`${styles.error} text_type_main-medium`}>{user.saveUserError}</p></Modal>)}
            <ProfileMenu decription={'В этом разделе вы можете изменить свои персональные данные'} />
            <section className={styles.section}>
                <span className='mt-5 textbox'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        size={'default'}
                        name={'name'}
                        onChange={onChange}
                        icon={'EditIcon'}
                        value={form.name}
                    />
                </span>
                <span className='mt-5 textbox'>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        size={'default'}
                        name={'email'}
                        icon={'EditIcon'}
                        onChange={onChange}
                        value={form.email}
                    />
                </span>
                <span className='mt-5 textbox'>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        size={'default'}
                        icon={'EditIcon'}
                        name={'password'}
                        onChange={onChange}
                        value={'********'}
                    />
                </span>
                <span className='mt-5'>
                    <Button  onClick={save}>Сохранить</Button>
                    <span className='ml-5'>
                        <Button onClick={cancel}>Отмена</Button>
                    </span>
                </span>
            </section>
        </main>
      </div>
  );
}
