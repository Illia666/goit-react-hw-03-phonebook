import PropTypes from 'prop-types';

import PhoneItem from '../PhoneItem/PhoneItem';

const PhoneList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <PhoneItem
            key={id}
            name={name}
            number={number}
            id={id}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

export default PhoneList;

PhoneList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};