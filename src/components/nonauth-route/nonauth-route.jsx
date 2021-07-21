import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export function NonAuthRoute({ children, ...rest }) {
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