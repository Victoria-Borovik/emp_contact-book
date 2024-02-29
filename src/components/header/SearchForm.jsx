import React  from 'react';
import './SearchForm.styles.css';
import { setSearchFormValue } from '../../slices/uiSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = () => {
  const value = useSelector((state) => state.ui.searchForm.value);
  const dispatch = useDispatch();

  return (
    <header>
      <form className='search-form'>
        <label htmlFor="search" className="sr-only">
          Найти контакт в телефонной книге
        </label>
        <input 
          type="text"
          className="search-input"
          placeholder="Поиск" 
          id="search"
          onChange={(e) => dispatch(setSearchFormValue(e.target.value))}
          value={value}
        >         
        </input>
      </form>
    </header>
  );
};

export default SearchForm;