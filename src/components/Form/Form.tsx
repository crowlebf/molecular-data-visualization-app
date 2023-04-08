import { useState } from 'react';
import styles from './Form.module.scss';

interface IFormProps {
  submit: (arg: any) => void;
}

export default function Form({ submit }: IFormProps) {
  const [inputValue, setInputValue] = useState('CHEMBL255');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(inputValue.replace(/\D/g, ''));
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter chEMBL ID"
      />
      <button className={styles.button} type="submit" disabled={!inputValue}>
        Submit
      </button>
    </form>
  );
}
