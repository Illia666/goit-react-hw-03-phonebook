import PropTypes from 'prop-types';

import styles from './phoneItem.module.scss';

const PhoneItem = ({ id, number, name, onDelete }) => {
  return (
    <li className={styles.item}>
      {' '}
      {name} : {number}
      &emsp;
      <button onClick={() => onDelete(id)} className={styles.button}>
        Delete
      </button>
    </li>
  );
};

export default PhoneItem;

PhoneItem.propTypes = {
  id: PropTypes.string,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};