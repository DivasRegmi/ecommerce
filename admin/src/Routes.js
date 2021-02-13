import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import AdminRoute from './auth/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={<h1>Shop</h1>} />
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={<h1>Dashboard</h1>}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
