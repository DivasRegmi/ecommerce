import { createSelector } from 'reselect';

const selectProduct = (state) => state.categorie;

export const selectCategories = createSelector(
  [selectProduct],
  (categorie) => categorie.categories
);
export const selectSubCategories = createSelector(
  [selectProduct],
  (categorie) => categorie.subCategories
);

export const selectIsCategorieFetching = createSelector(
  [selectProduct],
  (categorie) => categorie.isFetching
);
