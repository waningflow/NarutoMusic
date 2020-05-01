import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routerConfig } from '@/constants/router';
import App from '@/containers/App';
import Header from '@/containers/Header';
import Sidebar from '@/containers/Sidebar';
import Footer from '@/containers/Footer';
import Content from '@/containers/Content';
import Layout from '@/containers/Layout';

export default function Routes() {
  return (
    <App>
      <Layout
        Header={<Header />}
        Sidebar={<Sidebar />}
        Content={
          <Content>
            <Switch>
              {routerConfig.map(({ key, path, exact, component }) => (
                <Route
                  key={key}
                  path={path}
                  exact={exact}
                  component={component}
                />
              ))}
            </Switch>
          </Content>
        }
        Footer={<Footer />}
      />
    </App>
  );
}
