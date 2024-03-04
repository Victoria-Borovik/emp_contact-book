import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchFormValue: (state, { payload }) => {
      state.searchForm.value = payload;
    },
    openMenu: (state) => {
      state.modal.menuIsActive = true;
    },
    closeMenu: (state) => {
      state.modal.menuIsActive = false;
    },
    openAddContactForm: (state) => {
      state.modal.menuIsActive = false;
      state.modal.addContactFormIsActive = true;
    },
    closeAddContactForm: (state) => {
      state.modal.addContactFormIsActive = false;
    },
    openEditContactForm: (state) => {
      state.modal.editContactFormIsActive = true;
      state.editMode.isActive = false;
    },
    closeEditContactForm: (state) => {
      state.modal.editContactFormIsActive = false;
    },
    openContactInfo: (state, { payload }) => {
      state.viewedContactId = payload;  
      state.modal.contactInfoIsActive = true;
    },
    closeContactInfo: (state) => {
      state.viewedContactId = null;  
      state.modal.contactInfoIsActive = false;
    },
    setEditMode: (state) => {
      state.modal.menuIsActive = false;
      state.editMode.isActive = !(state.editMode.isActive);
    },
    setContactIdToEdit: (state, { payload }) => {
      state.editMode.contactId = payload;
    },
    setTypeSort: (state) => {
      state.typeSort = (state.typeSort !== 'ascending' ) ? 'ascending' : 'descending';
    },
    setContactIdToRenderCount: (state) => {
      state.contactsToRenderCount += 2;
    }
  }
});

export const {
  setSearchFormValue,
  openMenu, 
  closeMenu, 
  openAddContactForm, 
  closeAddContactForm,
  openEditContactForm,
  closeEditContactForm,
  openContactInfo,
  closeContactInfo,
  setEditMode,
  setContactIdToEdit,
  setTypeSort,
  setContactIdToRenderCount,
 } = uiSlice.actions;

export default uiSlice.reducer;

