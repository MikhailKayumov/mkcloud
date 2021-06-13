import React, { useState } from 'react';

import { useDispatch } from 'store';
import { RegistrationData } from 'store/user/types';
import { userThunks } from 'store/user/extraActions';

import { FlexBox } from 'utils/components/FlexBox';
import { Input } from 'utils/components/Input';

import './styles.scss';

export const Registration: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [{ password, email }, setForm] = useState<RegistrationData>({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(state => ({
      ...state,
      [name]: value,
    }));
  };

  const onClick = () => {
    if (email && password) {
      dispatch(
        userThunks.registration({
          email,
          password,
        }),
      ).then(data => {
        console.log(data);
      });
    }
  };

  return (
    <FlexBox direction="column" alignItems="center" className="registration">
      <div className="registration__header">Регистрация</div>
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
      <button className="registration__btn" onClick={onClick}>
        Зарегистрироваться
      </button>
    </FlexBox>
  );
};
