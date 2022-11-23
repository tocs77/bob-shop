import { RootState } from '../../store';
export const productsSelector = (store: RootState) => store.products.products;
export const productSelector = (store: RootState) => store.products.product;
export const loadingSelector = (store: RootState) => store.products.loading;
export const errorSelector = (store: RootState) => store.products.error;
