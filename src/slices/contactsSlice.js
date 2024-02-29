import { createSlice, createEntityAdapter, current  } from '@reduxjs/toolkit';

const contactsAdapter = createEntityAdapter();
const initialState = contactsAdapter.getInitialState({
  entities: {
    // contact1: {
    //   id: 'contact1',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact2: {
    //   id: 'contact2',
    //   name: 'Константин Константинович Константинопольский',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.дорога на Турухтанные Острова д.5 к.1',
    //   email: '12342@mail.com',
    // },
    // contact3: {
    //   id: 'contact3',
    //   name: 'Тай Вей',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact4: {
    //   id: 'contact4',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact5: {
    //   id: 'contact5',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact6: {
    //   id: 'contact6',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact7: {
    //   id: 'contact7',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact8: {
    //   id: 'contact8',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact9: {
    //   id: 'contact9',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact10: {
    //   id: 'contact10',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact11: {
    //   id: 'contact11',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact12: {
    //   id: 'contact12',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact13: {
    //   id: 'contact13',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact14: {
    //   id: 'contact14',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
    // contact15: {
    //   id: 'contact15',
    //   name: 'Александра Кукушкина',
    //   tel: '+7 918 883-42-30',
    //   address: 'Санкт-Петербург ул.Салова д.4 кв.2',
    //   email: '12342@mail.com',
    // },
  },
  ids: [
    // 'contact1', 'contact2', 'contact3', 'contact4', 'contact5',
    // 'contact6', 'contact7', 'contact8', 'contact9', 'contact10',
    // 'contact11', 'contact12', 'contact13', 'contact14', 'contact15',
  ],
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
