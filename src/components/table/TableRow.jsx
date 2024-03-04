import React  from 'react';
import './TableRow.style.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openEditContactForm, setContactIdToEdit, openContactInfo, setContactIdToRenderCount } from '../../slices/uiSlice.js';
import { removeContact } from '../../slices/contactsSlice.js';
import { selectors } from '../../slices/contactsSlice.js';

import avatar from '../../imgs/avatar.svg'

const normalize = (value) => value.toLowerCase().trim();

const normalizeTel = (value) => {
  const normalized = value.replace(/[^0-9]/g, '');
  if (!normalized.length) return value;
  return normalized;
}

const filterContacts = (contacts, value) => (
  contacts.filter((contact) => {
    const { name, tel, address, email } = contact;
    return normalize(name).includes(normalize(value))
      || normalizeTel(tel).includes(normalizeTel(value))
      || (address && normalize(address).includes(normalize(value)))
      || (email && normalize(email).includes(normalize(value)));
  })
);

const sortContacts = (contacts, typeSort) => {
  return contacts
    .slice()
    .sort((contact1, contact2) => {
      if (typeSort === 'ascending') {
        return contact1.name > contact2.name ? 1 : -1;
      }
      return contact1.name < contact2.name ? 1 : -1;
    })
};

const TableRow = () => {
  const contactsEntries = useSelector((state) => state.contacts.entities);
  const editModeIsActive = useSelector((state) => state.ui.editMode.isActive)
  const searchFormValue = useSelector((state) => state.ui.searchForm.value);
  const contactsToRenderCount = useSelector((state) => state.ui.contactsToRenderCount);
  const contactsCount = useSelector(selectors.selectTotal);
  const typeSort = useSelector((state) => state.ui.typeSort);
  const dispatch = useDispatch();

  const reviseConatacts = (entries) => {
    let contacts = Object.entries(entries).map(([, contact]) => contact);
    if (searchFormValue) {
      contacts = filterContacts(contacts, searchFormValue);
    }
    if (typeSort) {
      contacts = sortContacts(contacts, typeSort);
    }
    return contacts;
  };

  const contacts = reviseConatacts(contactsEntries);
  let contactsToRender = contacts.slice(0, contactsToRenderCount);

  const handleScroll = (scrolledEl) => () => {
    if (contactsToRenderCount >= contactsCount) return;
    if (scrolledEl.scrollHeight - scrolledEl.scrollTop - scrolledEl.clientHeight < 100) {
      dispatch(setContactIdToRenderCount())
    }
  };

  useEffect(() => {
    const scrolledEl = document.querySelector('.scroll-table-body');
    scrolledEl.addEventListener('scroll', handleScroll(scrolledEl))
    return () => {
      scrolledEl.removeEventListener('scroll', handleScroll)
    };
  });

  const viewContactInfo = (id) => () => {
    dispatch(openContactInfo(id));
  };
   
  const handleRemoveContact = (name, id) => () => {
    if (window.confirm(`Удалить контакт ${name}?`)) {
      dispatch(removeContact(id));
    }
  };

  const editContact = (id) => () => {
    dispatch(setContactIdToEdit(id));
    dispatch(openEditContactForm());
  };

  return (
    contactsToRender
      .map(({ id, name, tel, address, email, img }) => {
        return (
          <tr 
            className='tr'
            key={id}
            onDoubleClick={viewContactInfo(id)}
          >
            <td className='tr-col-img'>
              <div>
                <img 
                  src={img || avatar}
                  width="52"
                  height="52" 
                  alt="Фото"
                  className="tr-col-img-photo"
                />
              </div>
            </td>
            <td className='tr-col-name'>{name}</td>
            <td className='tr-col-number'>{tel}</td>
            <td className='tr-col-address'>{address}</td>
            <td className='tr-col-email'>{email}</td>
            <td className='tr-col-edit'>
              <button 
                type='button'
                className={editModeIsActive 
                  ? "tr-col-btn-edit active" 
                  : "tr-col-btn-edit"} 
                onClick={editContact(id)}
              >
                Редактировать
              </button>
              <button 
                type='button'
                className={editModeIsActive 
                  ? "tr-col-btn-delete active" 
                  : "tr-col-btn-delete"} 
                onClick={handleRemoveContact(name, id)}
              >
              </button>
            </td>
          </tr>
        );
    })
  );
};

export default TableRow;