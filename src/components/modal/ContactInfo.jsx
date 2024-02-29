import React  from 'react';
import './ContactInfo.style.css';
import { useSelector, useDispatch } from 'react-redux';
import { closeContactInfo } from '../../slices/uiSlice.js';
import { selectors } from '../../slices/contactsSlice.js';

import avatar from '../../imgs/avatar.svg'

const normalizeTel = (tel) => tel.replace(/[^0-9+]/g, '');

const СontactInfo = () => {
  const isActive = useSelector((state) => state.ui.modal.contactInfoIsActive);
  const contactId = useSelector((state) => state.ui.viewedContactId);
  const contact = useSelector((state) => selectors.selectById(state, contactId));
  const dispatch = useDispatch();

  return (
    contact && <div 
      className={isActive ? 'modal-view active' : 'modal-view'}
      onClick={() => dispatch(closeContactInfo())}>
      <div className="modal-view-content"  onClick={e => e.stopPropagation()}>
        <img 
          src={contact.img || avatar}
          width="106px"
          height="106px"
          alt="Аватар пользователя"
          className='view-img'
        />
        <h1 className="view-name">{contact.name}</h1>
        <h3 className="view-tel">
          <span>&#128242;</span>
          <span><a href={`tel:${normalizeTel(contact.tel)}`}>{contact.tel}</a></span>
        </h3>
        <div className="view-email">
          <span>&#128232;</span>
          <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
        </div>
        <div className="view-address">
          <span>&#127968;</span>
          <span className="view-email">{contact.address}</span>
        </div>

      </div>
    </div>
  );
};

export default СontactInfo;