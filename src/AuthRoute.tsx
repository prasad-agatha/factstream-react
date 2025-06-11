import React from 'react';
// Router Imports
import {Route, Redirect} from 'react-router-dom';
// Redux imports
// cookie
import cookie from 'js-cookie';

function AuthRoute({component: Component, ...rest}) {
  console.log(cookie.get('accessToken'));

  return (
    <Route
      {...rest}
      render={(props) =>
        cookie.get('accessToken') ? (
          <Redirect
            to={{
              pathname: '/',
              state: {from: props.location},
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default AuthRoute;
