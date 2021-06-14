import React from 'react';

import { useDispatch } from 'store';
import { userThunks } from 'store/user/extraActions';

import { useForm } from './useForm';

export const Registration: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const onClick = () => {
    const { email, password } = data;

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

  const { form, data } = useForm({
    title: 'Регистрация',
    submitBtnTitle: 'Зарегистрироваться',
    submit: onClick,
  });

  return form;
};
