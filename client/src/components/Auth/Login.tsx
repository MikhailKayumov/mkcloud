import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'store';
import { userThunks } from 'store/user/extraActions';

import { useForm } from './useForm';

export const Login: React.FC = (): JSX.Element => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const onClick = () => {
    const { email, password } = data;
    if (email && password) {
      dispatch(userThunks.login({ email, password })).then(() => {
        push('/');
      });
    }
  };

  const { form, data } = useForm({
    title: 'Авторизация',
    submitBtnTitle: 'Войти',
    submit: onClick
  });

  return form;
};
