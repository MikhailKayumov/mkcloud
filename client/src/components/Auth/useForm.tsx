import React, { useState } from 'react';

import { AuthData } from 'store/user/types';

import { FlexBox } from 'utils/components/FlexBox';
import { Input } from 'utils/components/Input';

import './styles.scss';

type UseFormProps = {
  title: string;
  submitBtnTitle: string;
  submit: () => void;
};

type UseFormReturned = {
  data: AuthData;
  form: JSX.Element;
};

export const useForm = ({
  title,
  submitBtnTitle,
  submit
}: UseFormProps): UseFormReturned => {
  const [{ password, email }, setForm] = useState<AuthData>({
    email: '',
    password: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((state) => ({
      ...state,
      [name]: value
    }));
  };

  const form = (
    <FlexBox direction="column" alignItems="center" className="auth_form">
      <div className="auth_form__header">{title}</div>
      <Input
        value={email}
        name="email"
        placeholder="Email"
        onChange={onChange}
      />
      <Input
        value={password}
        name="password"
        placeholder="Пароль"
        type="password"
        onChange={onChange}
      />
      <button className="button auth_form__btn" onClick={submit}>
        {submitBtnTitle}
      </button>
    </FlexBox>
  );

  return { data: { password, email }, form };
};
