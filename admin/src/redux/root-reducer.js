import { combineReducers } from 'redux';

import adminReducer from './admin/admin.reducer';
import productReducer from './product/product.reducer';
import categorieReducer from './categorie/categorie.reducer';

const rootReducer = combineReducers({
  product: productReducer,
  admin: adminReducer,
  categorie: categorieReducer,
});

export default rootReducer;
