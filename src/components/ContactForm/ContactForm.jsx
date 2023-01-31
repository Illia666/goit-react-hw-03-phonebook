import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contact-form.module.scss';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleOnChange = evt => {
    const { name, value } = evt.currentTarget;

    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    if (this.props.onAddContact({ name: name, number: number })) {
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleOnChange}
            value={name}
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleOnChange}
            value={number}
          />
        </label>
        <button className={styles.button}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};