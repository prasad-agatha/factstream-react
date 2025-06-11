import React from 'react';
// Router Imports
import {Router, Route, Switch, useHistory} from 'react-router-dom';
import history from 'src/lib/history';
// components
import HomePage from './pages/Home';
import DashboardPage from './pages/dashboard';
import TimeseriesData from './pages/company/[company_id]/timeseriesdata';
import Timeseriespdf from './pages/company/[company_id]/timeseriespdf';
import NormalisedData from './pages/company/[company_id]/normaliseddata/[document_id]';
import NormaliedPdf from './pages/company/[company_id]/normalisedpdf/[document_id]';
import ListPage from './pages/company/[company_id]';
// Private Route For Auth redirection.
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
// import Home from 'src/pages/index';
import {SiteLayout} from 'src/layouts';
// SignIn
import SignIn from 'src/pages/auth/signin';
// cookie
import cookie from 'js-cookie';
// style
import 'src/styles/App.scss';
import '@kenshooui/react-multi-select/dist/style.css';

function App() {
  /**
   * Similar to componentDidMount and componentDidUpdate:
   * Checking for the user token availability and changing the isAuthenticated flag value.
   */
  const location = useHistory();
  React.useEffect(() => {
    if (!cookie.get('accessToken') && !cookie.get('username')) {
      location.push('/auth/signin');
    }
  });
  // Rending Routes
  return (
    <Router history={history}>
      <SiteLayout>
        <div>
          <div className="app-container">
            <Switch>
              <AuthRoute path="/auth/signin" exact component={SignIn} />
              <PrivateRoute path="/" exact component={HomePage} />
              {/* <PrivateRoute path="/dashboard" exact component={DashboardPage} /> */}
              <PrivateRoute path="/company/:company_id/" exact component={ListPage} />
              <PrivateRoute
                path="/company/:company_id/timeseriesdata"
                exact
                component={TimeseriesData}
              />
              <PrivateRoute
                path="/company/:company_id/timeseriespdf"
                exact
                component={Timeseriespdf}
              />
              <PrivateRoute
                path="/company/:company_id/normaliseddata/:document_id"
                exact
                component={NormalisedData}
              />
              <PrivateRoute
                path="/company/:company_id/normalisedpdf/:document_id"
                exact
                component={NormaliedPdf}
              />
            </Switch>
          </div>
        </div>
      </SiteLayout>
    </Router>
  );
}

export default App;
