import { RootState } from '../../store';
export const orderSelector = (store: RootState) => store.order.order;
export const loadingSelector = (store: RootState) => store.order.loading;
export const errorSelector = (store: RootState) => store.order.error;
