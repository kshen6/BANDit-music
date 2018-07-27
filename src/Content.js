import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Marketplace from './Marketplace/Marketplace';
import Activity from './Activity/Activity';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/activity" component={Activity} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={Auth} />
    </Switch>
  );
};
