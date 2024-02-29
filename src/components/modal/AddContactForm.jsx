import React  from 'react';
import './AddСontactForm.style.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAddContactForm } from '../../slices/uiSlice.js';
import { selectors, addContact } from '../../slices/contactsSlice.js';

import avatar from '../../imgs/avatar.svg'

const AddContactForm = () => {
  const isActive = useSelector((state) => state.ui.modal.addContactFormIsActive);
  const contactsCount = useSelector(selectors.selectTotal);
  const dispatch = useDispatch();

  const [state, setState] = useState({});

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setState({...state, [key]: value})
  };

  const handleImgChange = (e) => {
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
    const newContact = { id: `contact${contactsCount + 1}`, ...state };
    dispatch(addContact(newContact));
    dispatch(closeAddContactForm());
    e.target.reset();
    setState({});
  };

  const handleReset = () => {
    dispatch(closeAddContactForm());
    setState({});
  };

  return (
    <div className={isActive ? 'modal-add active' : 'modal-add'}>
      <div className="modal-add-content">
        <h1>Добавить пользователя</h1>
        <form 
          className="add-form" 
          onSubmit={handleSubmit} 
          onReset={handleReset}
        >
          <label htmlFor="add-img" className="add-form-img">
            <input 
              type="file"
              id='add-img'
              className='add-form-img-input'
              onChange={handleImgChange}
            />
            <img 
              src={state.img || avatar}
              width="106px"
              height="106px"
              alt="Аватар пользователя"
              className='add-form-img-img'
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
            className="add-form-input"
            onChange={handleChange}
            onBlur={handleChange}
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
            className="add-form-input"
            onChange={handleChange}
            onBlur={handleChange}
            value={state.tel || ''}
          />
          <label htmlFor="email" className="sr-only">
            Электроная почта нового контакта
          </label>
          <input 
            type="email"
            placeholder="Электорнная почта"
            id='email'
            className="add-form-input"
            onChange={handleChange}
            onBlur={handleChange}
            value={state.email || ''}
          />
          <label htmlFor="address" className="sr-only">
            Адрес нового контакта
          </label>
          <input 
            type="text"
            placeholder="Адрес"
            id='address'
            className="add-form-input"
            onChange={handleChange}
            onBlur={handleChange}
            value={state.address || ''}
          />
          <div>
            <button type="submit" className="add-form-btn">
              Сохранить
            </button>
            <button type="reset" className="add-form-btn">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;