import React, {FC} from 'react';

// components
// import {Link} from '../components/elements';
import {Link} from 'react-router-dom';
// next router
// import Router from 'next/router';
// cookie
import cookie from 'js-cookie';
// react router
import {useHistory} from 'react-router-dom';

const Home: FC = () => {
  const history = useHistory();

  React.useEffect(() => {
    if (!cookie.get('accessToken')) {
      // Router.push('/auth/signin');
      history.push('/auth/signin');
    } else {
      // Router.push('/dashboard');
      history.push('/dashboard');
    }
  });
  return (
    <div>
      <title>FactStream</title>
      <link rel="icon" href="/favicon.ico" />

      <main className="text-center">
        <h1>Welcome to Factstream</h1>
        <Link to="/dashboard">
          <a>Go to Dashbaord</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
