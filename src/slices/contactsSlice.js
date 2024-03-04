import { createSlice, createEntityAdapter, current  } from '@reduxjs/toolkit';

const contactsAdapter = createEntityAdapter();
const initialState = contactsAdapter.getInitialState({
  entities: {},
  ids: [],
});

const normalizeTel = (tel) => {
  const rawTel = tel.replace(/[^0-9]/g, '').slice(1);
  return `+7 ${rawTel.slice(0, 3)} ${rawTel.slice(3, 6)}-${rawTel.slice(6, 8)}-${rawTel.slice(8, 10)}`;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      contactsAdapter.addOne(state, {...payload, tel: normalizeTel(payload.tel) });
    },
    addConatcts: contactsAdapter.addMany,
    updateContact: (state, { payload }) => {
      const { id, changes } = payload;
      changes.tel = normalizeTel(changes.tel);
      contactsAdapter.updateOne(state, { id, changes });
    },
    removeContact: (state, { payload }) => {
      console.log(current(state));
      contactsAdapter.removeOne(state, payload);
      console.log(payload);
    },

  },
});

export const selectors = contactsAdapter.getSelectors((state) => state.contacts);
export const { addContact, removeContact, updateContact, addConatcts } = contactsSlice.actions;

export default contactsSlice.reducer;
