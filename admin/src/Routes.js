import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import AllProductsPage from './pages/product/AllProductsPage';
import AddProductPage from './pages/product/AddProductPage';
import Categories from './pages/product/Categories';
import SubCategories from './pages/product/SubCategories';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pages/products" exact component={AllProductsPage} />
        <Route
          path="/pages/products/add-product"
          exact
          component={AddProductPage}
        />
        <Route path="/pages/products/catories" exact component={Categories} />
        <Route
          path="/pages/products/sub-categories"
          exact
          component={SubCategories}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
