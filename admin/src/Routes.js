import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AllProductsPage from './pages/product/AllProductsPage';
import AddProductPage from './pages/product/AddProductPage';
import CategoriesPage from './pages/product/CategoriesPage';
import SubCategoriePage from './pages/product/SubCategoriesPage';
import ShowProductContainer from './pages/product/ShowProduct/ShowProductContainer';
import DashBoard from './pages/dashbord/DashBoard';
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={DashBoard} />
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
          component={ShowProductContainer}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
