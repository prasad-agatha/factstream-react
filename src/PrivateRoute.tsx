import React from 'react';
// Router Imports
import {Route, Redirect} from 'react-router-dom';
// Redux imports
// cookie
import cookie from 'js-cookie';

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        cookie.get('accessToken') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
