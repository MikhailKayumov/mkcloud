import React from 'react';

import './styles.module.scss';
import { InputProps } from './types';

import classes from './styles.module.scss';

export const Input: React.FC<InputProps> = ({
  value = '',
  type = 'text',
  placeholder = '',
  name = '',
  onChange = undefined
}): JSX.Element => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={classes.input}
      name={name}
      onChange={onChange}
    />
  );
};
