import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '@/constants/routes.json';
import App from '@/containers/App';
import Header from '@/containers/Header';
import Sidebar from '@/containers/Sidebar';
import Footer from '@/containers/Footer';
import Content from '@/containers/Content';
import Layout from '@/containers/Layout';
import Home from '@/pages/Home';
import MusicSheet from '@/pages/MusicSheet';
import MusicPlay from '@/pages/MusicPlay';

export default function Routes() {
  return (
    <App>
      <Layout
        Header={<Header />}
        Sidebar={<Sidebar />}
        Content={
          <Content>
            <Switch>
              <Route path={routes.HOME} exact component={Home} />
              <Route path={routes.MUSIC_SHEET} component={MusicSheet} />
              <Route path={routes.MUSIC_PLAY} exact component={MusicPlay} />
            </Switch>
          </Content>
        }
        Footer={<Footer />}
      />
    </App>
  );
}
