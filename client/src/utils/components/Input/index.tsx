import React, {
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes
} from 'react';

import './styles.module.scss';
import { InputProps } from './types';

import classes from './styles.module.scss';

export const Input: ForwardRefExoticComponent<
  PropsWithChildren<PropsWithoutRef<InputProps>> &
    RefAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = '',
      type = 'text',
      placeholder = '',
      name = '',
      onChange = undefined
    },
    ref
  ): JSX.Element => {
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classes.input}
        name={name}
        onChange={onChange}
      />
    );
  }
);
