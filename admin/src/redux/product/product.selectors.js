import { createSelector } from 'reselect';

const selectProductState = (state) => state.product;

export const selectProducts = createSelector(
  [selectProductState],
  (productStore) => productStore.products
);

export const selectIsProductLoading = createSelector(
  [selectProductState],
  (productStore) => productStore.isLoading
);

export const selectProductById = createSelector(
  [selectProductState],
  (productStore) => productStore.product
);
