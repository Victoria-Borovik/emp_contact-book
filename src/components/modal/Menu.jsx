import React  from 'react';
import './Menu.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu, openAddContactForm, setEditMode } from '../../slices/uiSlice.js';
import { selectors, addConatcts } from '../../slices/contactsSlice.js';

import {ReactComponent as ExportIcon} from '../../imgs/export_icon.svg';
import {ReactComponent as ImportIcon} from '../../imgs/import_icon.svg';
import {ReactComponent as PencilIcon} from '../../imgs/pencil_icon.svg';
import {ReactComponent as UserIcon} from '../../imgs/user_icon.svg';

const createUrl = (data) => {
  const dataJson = JSON.stringify(data);
  const blob = new Blob([dataJson], { type: 'application/json' });
  return URL.createObjectURL(blob);
};

const Menu = () => {
  const isActive = useSelector((state) => state.ui.modal.menuIsActive);
  const contacts = useSelector(selectors.selectEntities);
  const dispatch = useDispatch();

  const importFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const newContacts = JSON.parse(reader.result);
        dispatch(addConatcts(newContacts))
        dispatch(closeMenu())
      };
    }
  };

  return (
    <div 
      className={isActive ? 'modal-menu active' : 'modal-menu'} 
      onClick={() => dispatch(closeMenu())}>
      <nav className="modal-menu-content" onClick={e => e.stopPropagation()}>
        <ul className='menu-list'>

          <li>
            <div className='menu-item menu-item-top' onClick={() => dispatch(openAddContactForm())}>
              <div className='menu-item-wrap wrap-top'>
                <UserIcon className='menu-item-img' />
                <p className='menu-item-text'>
                  Добавить пользователя
                </p>
              </div>
            </div>
          </li>

          
          <li>
            <a 
              href={createUrl(contacts)}
              download='Contacts'
              onClick={() => dispatch(closeMenu())}
            >
              <div className='menu-item menu-item-right'>
                <div className='menu-item-wrap wrap-right'>
                    <ExportIcon className='menu-item-img' />
                    <p className='menu-item-text'>
                      Экспортировать контакты
                    </p>
                </div>
              </div>
            </a>
          </li>

          <li>
            <label htmlFor="import">
              <input 
                type="file"
                id='import'
                className='menu-item-import'
                accept="application/json"
                onChange={importFile}
              />
              <div className='menu-item menu-item-left'>
                <div className='menu-item-wrap wrap-left'>
                    <ImportIcon className='menu-item-img' />
                    <p className='menu-item-text'>
                      Импортировать контакты
                    </p>
                </div>
              </div>
            </label>
          </li>

          <li>
            <div className='menu-item menu-item-bottom'onClick={() => dispatch(setEditMode())}>
              <div className='menu-item-wrap wrap-bottom'>
                  <PencilIcon className='menu-item-img' />
                  <p className='menu-item-text'>
                    Редактировать список
                  </p>
              </div>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Menu;