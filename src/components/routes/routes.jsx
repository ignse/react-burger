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

function Routes() {
    let history = useHistory();
    let location = useLocation();

    const background = history.action === 'PUSH' &&  location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
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
                <ProtectedRoute path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </ProtectedRoute>
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