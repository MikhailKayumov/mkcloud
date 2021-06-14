import React from 'react';

import { useDispatch } from 'store';
import { userThunks } from 'store/user/extraActions';

import { useForm } from './useForm';

export const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const onClick = () => {
    const { email, password } = data;
    if (email && password) {
      dispatch(userThunks.login({ email, password }));
    }
  };

  const { form, data } = useForm({
    title: 'Авторизация',
    submitBtnTitle: 'Войти',
    submit: onClick
  });

  return form;
};
