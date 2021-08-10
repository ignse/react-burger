import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {
    FeedPage,
    ForgotPasswordPage,
    HomePage, IngredientPage,
    LoginPage,
    NotFound404, OrderPage,
    OrdersPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage
} from '../../pages';
import {ProtectedRoute} from '../protected-route/protected-route';
import {NonAuthRoute} from '../nonauth-route/nonauth-route';

function Routes() {
    let history = useHistory();
    let location = useLocation<Location & {background?: string}>();

    const background: any = history.action === 'PUSH' &&  location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <NonAuthRoute path="/register" exact={true}>
                    <RegisterPage />
                </NonAuthRoute>
                <NonAuthRoute path="/login" exact={true}>
                    <LoginPage />
                </NonAuthRoute>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}>
                    <OrdersPage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders/:id" exact={true}>
                    <OrderPage />
                </ProtectedRoute>
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <OrderPage />
                </Route>
                <NonAuthRoute path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </NonAuthRoute>
                <NonAuthRoute path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </NonAuthRoute>
                <Route path="/ingredients/:id">
                    <IngredientPage />
                </Route>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;