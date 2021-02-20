import { combineReducers } from 'redux';

import productReducer from './product/product.reducer';
// import cartReducer from './cart/cart.reducer';
// import directoryReducer from './directory/directory.reducer';
// import shopReducer from './shop/shop.reducer';

const rootReducer = combineReducers({
  product: productReducer,
  // cart: cartReducer,
  // directory: directoryReducer,
  // shop: shopReducer,
});

export default rootReducer;
