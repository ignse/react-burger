import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import {FC, ReactNode} from "react";

interface IProtectedRoute {
    children: ReactNode;
    path: string;
    exact: boolean;
    rest?: {[p:string]: any}
};

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
          getCookie('accessToken') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
