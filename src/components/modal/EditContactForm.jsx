import React  from 'react';
import './EditContactForm.style.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEditContactForm, setContactIdToEdit } from '../../slices/uiSlice.js';
import { selectors, updateContact } from '../../slices/contactsSlice.js';

import avatar from '../../imgs/avatar.svg'

const EditContactForm = () => {
  const isActive = useSelector((state) => state.ui.modal.editContactFormIsActive);
  const contactId = useSelector((state) => state.ui.editMode.contactId);
  const contact = useSelector((state) => selectors.selectById(state, contactId));
  const dispatch = useDispatch();

  const [state, setState] = useState({});

  useEffect(() => {
    if (contactId !== null) {
      setState(contact);
    }
  }, [contactId, contact]);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setState({...state, [key]: value})
  };

  const handleImChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = reader.result;
        setState({...state, img })
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...changes } = state;
    dispatch(updateContact({ id, changes }));
    dispatch(setContactIdToEdit(null));
    dispatch(closeEditContactForm());
    e.target.reset();
    setState({});
  };

  const handleReset = () => {
    dispatch(closeEditContactForm());
    dispatch(setContactIdToEdit(null));
    setState({});
  };

  return (
    <div className={isActive ? 'modal-edit active' : 'modal-edit'}>
      <div className="modal-edit-content">
        <h1>Редактировать пользователя</h1>
        <form 
          className="edit-form"
          onSubmit={handleSubmit}
          onReset={handleReset}>
          <label htmlFor="edit-img" className="edit-form-img">
            <input 
              type="file"
              id='edit-img'
              className='edit-form-img-input'
              onChange={handleImChange}/>
            <img 
              src={state.img || avatar}
              width="106px"
              height="106px"
              alt="Аватар пользователя"
              className='edit-form-img-img'
              onClick={(e) => e.stopPropagation()}
            />
          </label>
          <label htmlFor="name" className="sr-only">
            Имя нового контакта
          </label>
          <input 
            type="text" 
            placeholder="Имя"
            id='name'
            required
            className='edit-form-input'
            onChange={handleChange}
            value={state.name || ''}
          />
          <label htmlFor="tel" className="sr-only">
            Номер нового контакта
          </label>
          <input 
            type="tel"
            placeholder="Номер"
            id='tel'
            required
            pattern="(\+7\s?|8\s?)\s?(\(\d{3}\)\s?|\d{3}\s?|\d{3}\s?-|\d{5})(\d{5}|\s?\d{3}-\d{2}-\d{2}|\s?\d{3}\s?-?\s?\d{2}\s?-?\s?\d{2})"
            onChange={handleChange}
            className='edit-form-input'
            value={state.tel || ''}
          />
          <label htmlFor="email" className="sr-only">
            Электроная почта нового контакта
          </label>
          <input 
            type="email"
            placeholder="Электорнная почта"
            id='email'
            className='edit-form-input'
            onChange={handleChange}
            value={state.email || ''}
          />
          <label htmlFor="address" className="sr-only">
            Адрес нового контакта
          </label>
          <input 
            type="text"
            placeholder="Адрес"
            id='address'
            className='edit-form-input'
            onChange={handleChange}
            value={state.address || ''}
          />
          <div>
            <button type="submit" className="edit-form-btn">
              Сохранить
            </button>
            <button type="reset" className="edit-form-btn">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactForm;