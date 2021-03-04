import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import AllProductsPage from './pages/product/AllProductsPage';
import AddProductPage from './pages/product/AddProductPage';
import CategoriesPage from './pages/product/CategoriesPage';
import SubCategoriePage from './pages/product/SubCategoriesPage';
import ShowProduct from './pages/product/ShowProduct';
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
        <Route
          path="/pages/products/categories"
          exact
          component={CategoriesPage}
        />
        <Route
          path="/pages/products/sub-categories"
          exact
          component={SubCategoriePage}
        />
        <Route
          path="/pages/products/show/:product"
          exact
          component={ShowProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
