import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import PhoneList from './PhoneList/PhoneList';
import '../styles/shared.scss';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts?.length) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts: prevContacts } = prevState;
    const { contacts } = this.state;
    if (prevContacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  isDuplicate = name => {
    const { contacts } = this;
    const normalizeName = name.toLocaleLowerCase();
    const contact = contacts.some(
      ({ name }) => name.toLocaleLowerCase() === normalizeName
    );

    return contact;
  };

  handleAddContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => name === contact.name)) {
      alert(`${name} is already in contacts.`);
      return null;
    }
    const id = nanoid();
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContacts = [...contacts, { id, name, number }];
      return { ...prevState, contacts: newContacts };
    });
    return { id, name, number };
  };

  handleOnChangeFilter = evt => {
    const { value } = evt.currentTarget;
    this.setState(prevState => {
      return {
        ...prevState,
        filter: value,
      };
    });
  };

  calcVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
    return visibleContacts;
  };

  onDeleteContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContacts = contacts.filter(contact => contact.id !== id);

      return { ...prevState, contacts: newContacts };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.calcVisibleContacts();
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleOnChangeFilter} />
        <PhoneList contacts={visibleContacts} onDelete={this.onDeleteContact} />
      </div>
    );
  }
}