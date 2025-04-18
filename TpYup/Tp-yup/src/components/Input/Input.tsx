import React from 'react';
import styles from './Input.module.css';

interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<Props> = ({ label, name, type = 'text', value, onChange, error }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.labelSlice} htmlFor={name}>{label}</label>
      <input className={styles.inputSlice} id={name} name={name} type={type} value={value} onChange={onChange} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
