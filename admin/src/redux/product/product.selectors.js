import { createSelector } from 'reselect';

const selectProductState = (state) => state.product;

export const selectProduct = createSelector(
  [selectProductState],
  (productStore) => productStore.product
);
export const selectProducts = createSelector(
  [selectProductState],
  (productStore) => productStore.products
);
export const selectProductsForTabel = createSelector(
  [selectProductState],
  (productStore) => {
    const { products } = productStore;

    return products.map((product) => {
      const { costPrice, markedPrice, discountPercent, seelingPrice } = product;
      return {
        ...product,
        price: {
          costPrice,
          markedPrice,
          discountPercent,
          seelingPrice,
        },
      };
    });
  }
);

export const selectIsProductLoading = createSelector(
  [selectProductState],
  (productStore) => productStore.isLoading
);

export const selectProductErrors = createSelector(
  [selectProductState],
  (productStore) => productStore.error
);
