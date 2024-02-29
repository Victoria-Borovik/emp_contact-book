import React from 'react';
import './TableHeader.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu, setEditMode, setTypeSort } from '../../slices/uiSlice.js';

const TableHeader = () => {
  const active = useSelector((state) => state.ui.editMode.isActive);
  const typeSort = useSelector((state) => state.ui.typeSort);
  const dispatch = useDispatch();

  const getClassName = () => {
    if (typeSort === null) return '';
    return typeSort === 'ascending' ? 'arrow-descending' : 'arrow-ascending';
  };

  return (
    <thead className='thead thead-shadow'>
      <tr className='thead-row'>
        <th className='thead-icon'>
            <button 
              className="thead-icon-btn"
              type="button"
              onClick={() => dispatch(openMenu())}
            >
              <div className="thead-icon-icon"></div>
            </button>
        </th>
        <th className='thead-name' onClick={() => dispatch(setTypeSort())}>
          <p>Имя</p>
          <div className={getClassName()}></div>
        </th>
        <th className='thead-number'>Телефон</th>
        <th className='thead-address'>Адрес</th>
        <th className='thead-email'>Электронная почта</th>
        <th className='thead-edit'>
          <button 
            className={active ? "thead-btn active" : "thead-btn"}
            onClick={() => dispatch(setEditMode())}
          >
            Закрыть редактированиe
          </button>
        </th>
      </tr>
    </thead >
  );
};

export default TableHeader;