import React, { useCallback, useMemo } from 'react';

import { userActions, userThunks } from 'store/user';
import { LoginData, LoginError } from 'store/user/types';

import { Alert } from 'utils/components/Alert';
import { Input } from 'utils/components/Input';

import { Form } from '../Form';
import { useForm } from '../Form/useForm';

export const LoginForm: React.FC = (): JSX.Element => {
  const form = useForm<LoginData, LoginError>({
    email: '',
    password: ''
  });

  const alertTitle = useMemo(() => {
    if (!form.error) return '';
    return form.error.message;
  }, [form.error]);

  const onSubmit = useCallback(() => {
    const { email, password } = form.data;
    if (email && password) {
      form.setIsError(false);

      form.dispatch(userActions.showLoading());
      form
        .dispatch(userThunks.login(form.data))
        .then(({ payload, meta: { requestStatus } }) => {
          if (requestStatus === 'rejected') {
            form.setError(payload as LoginError);
            form.setIsError(true);
            form.dispatch(userActions.logout());
          }
        })
        .finally(() => form.dispatch(userActions.hideLoading()));
    }
  }, [form]);

  return (
    <>
      <Alert
        type="error"
        title={alertTitle}
        show={form.isError}
        leaveIn={15000}
      />
      <Form
        formTitle="Вход"
        omSubmit={onSubmit}
        submitBtnLabel="Войти"
        btnDisable={form.loading}
      >
        <Input
          value={form.data.email}
          name="email"
          placeholder="Email"
          onChange={form.onChange}
        />
        <Input
          value={form.data.password}
          name="password"
          placeholder="Пароль"
          type="password"
          onChange={form.onChange}
        />
      </Form>
    </>
  );
};
