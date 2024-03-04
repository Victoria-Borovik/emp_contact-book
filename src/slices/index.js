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
    const state = (JSON.parse(localStorage.getItem('applicationState')))
    state.ui = {
      searchForm: {
        value: '',
      },
      modal: {
        menuIsActive: false,
        addContactFormIsActive: false,
        editContactFormIsActive: false,
        contactInfoIsActive: false,
      },
      editMode: {
        isActive: false,
        contactId: null,
      },
      viewedContactId: null,
      typeSort: null,
      contactsToRenderCount: 20,
    };
    console.log(state)
    return state;
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