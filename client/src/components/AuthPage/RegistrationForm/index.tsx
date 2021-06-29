import React, { useCallback, useMemo } from 'react';

import { userActions, userThunks } from 'store/user';
import { RegistrationData, RegistrationError } from 'store/user/types';

import { Input } from 'utils/components/Input';
import { Alert } from 'utils/components/Alert';
import { Form } from '../Form';
import { useForm } from '../Form/useForm';

export const RegistrationForm: React.FC = (): JSX.Element => {
  const form = useForm<RegistrationData, RegistrationError>({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const { alertTitle, alertContent } = useMemo(() => {
    if (!form.error) return { alertTitle: '', alertContent: null };
    return {
      alertTitle: form.error.message,
      alertContent: form.error.errors?.map((msg) => <div key={msg}>{msg}</div>)
    };
  }, [form.error]);

  const onSubmit = useCallback(() => {
    const { email, password, lastname, firstname } = form.data;
    if (email && password && lastname && firstname) {
      form.setIsError(false);

      form.dispatch(userActions.showLoading());
      form
        .dispatch(userThunks.registration(form.data))
        .then(({ payload, meta: { requestStatus } }) => {
          if (requestStatus === 'rejected') {
            form.setError(payload as RegistrationError);
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
      >
        {alertContent}
      </Alert>
      <Form
        formTitle="Регистрация"
        omSubmit={onSubmit}
        submitBtnLabel="Зарегистрироваться"
        btnDisable={form.loading}
      >
        <Input
          value={form.data.email}
          name="email"
          placeholder="Email"
          onChange={form.onChange}
        />
        <Input
          value={form.data.firstname}
          name="firstname"
          placeholder="Имя"
          onChange={form.onChange}
        />
        <Input
          value={form.data.lastname}
          name="lastname"
          placeholder="Фамилия"
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
