import React from 'react';
import styles from './Button.module.css';

interface Props {
  disabled: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ disabled, children }) => {
  return (
    <button className={styles.button} type="submit" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
