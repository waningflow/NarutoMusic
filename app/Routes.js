import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';

import Home from './components/Home';
import Header from './containers/Header';
import Sidebar from './containers/Sidebar';
import Footer from './containers/Footer';
import Content from './containers/Content';

import Layout from './containers/Layout';

export default () => (
  <div>
    <Layout
      Header={Header}
      Sidebar={Sidebar}
      Content={() => (
        <Content>
          <Switch>
            <Route path={routes.HOME} component={Home} />
          </Switch>
        </Content>
      )}
      Footer={Footer}
    />
  </div>
);
