import React  from 'react';
import './App.css';
import Form from './header/SearchForm.jsx';
import Table from './table/Table.jsx';
import Menu from './modal/Menu.jsx';
import AddContactForm from './modal/AddContactForm.jsx';
import EditContactForm from './modal/EditContactForm.jsx';
import СontactInfo from './modal/ContactInfo.jsx'

const App = () => {
  return (
    <div className="App">
      <Form />
      <Table />
      <Menu />
      <AddContactForm />
      <EditContactForm />
      <СontactInfo />
    </div>
  );
}

export default App;
