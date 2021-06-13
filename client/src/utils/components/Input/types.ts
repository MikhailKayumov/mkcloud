import React from 'react';

export type InputTypeAttr =
  | 'text'
  | 'number'
  | 'password'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'email'
  | 'file'
  | 'hidden'
  | 'range';

export type InputProps = {
  value?: string;
  type?: InputTypeAttr;
  placeholder?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
