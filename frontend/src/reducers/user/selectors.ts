import { RootState } from '../../store';
export const userInfoSelector = (store: RootState) => store.user.userInfo;
export const loadingSelector = (store: RootState) => store.user.loading;
export const errorSelector = (store: RootState) => store.user.error;
