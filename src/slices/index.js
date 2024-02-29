import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice.js';
import uiReducer from './uiSlice.js';

const localStorageMiddleware = ({ getState }) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('applicationState', JSON.stringify(getState()));
  return result;
}

const uploadLocalStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState'));
  }
};

export default configureStore({
  reducer: {
    contacts: contactsReducer,
    ui: uiReducer,
  },
  preloadedState: uploadLocalStore(),
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
});