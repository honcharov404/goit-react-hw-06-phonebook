import { useDispatch, useSelector } from 'react-redux';

import { addContact, deleteContact } from './Redux/ContactsSlice/ContactsSlice';

import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

import s from './App.module.css';
import { setFilter } from './Redux/FilterSlice/FilterSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const onAddContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId.target.value));
  };

  const onSetFilter = e => {
    const filter = e.target.value;

    dispatch(setFilter(filter));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  return (
    <div className={s.App}>
      <h1 className={s.mainTitle}>Phonebook</h1>
      <ContactForm addContact={onAddContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter filter={filter} setFilter={onSetFilter} />
      <ContactList
        contacts={filterContacts()}
        deleteContact={onDeleteContact}
      />
    </div>
  );
};
