import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import {FC, ReactNode} from "react";

interface INonAuthRoute {
    children: ReactNode;
    path: string;
    exact: boolean;
    rest?: {[p:string]: any}
};

export const NonAuthRoute: FC<INonAuthRoute> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location}) =>
          !getCookie('accessToken') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
      }
    />
  );
}