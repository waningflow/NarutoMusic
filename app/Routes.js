import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';

import Home from './components/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Content from './components/Content';

import Layout from './containers/Layout';

export default () => (
  <div>
    <Layout
      Header={Header}
      Sidebar={Sidebar}
      Content={() => (
        <Content>
          {/* <Switch>
            <Route path={routes.HOME} component={Home} />
          </Switch> */}
        </Content>
      )}
      Footer={Footer}
    />
  </div>
);
