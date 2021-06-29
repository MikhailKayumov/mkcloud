import React from 'react';
import { FlexBox } from 'utils/components/FlexBox';

type FormProps = {
  formTitle: string;
  submitBtnLabel: string;
  omSubmit: () => void;
  btnDisable?: boolean;
};

export const Form: React.FC<FormProps> = React.memo(
  ({
    formTitle,
    submitBtnLabel,
    omSubmit,
    children,
    btnDisable = false
  }): JSX.Element => {
    const onSubmitHandler = (event: React.FormEvent) => {
      event.preventDefault();
      omSubmit();
    };

    return (
      <form className="auth_form">
        <div className="auth_form__title">{formTitle}</div>
        <FlexBox direction="column" className="auth_form__body">
          {children}
        </FlexBox>
        <FlexBox justify="flex-end" className="auth_form__footer">
          <button
            className="button auth_form__btn"
            type="submit"
            onClick={onSubmitHandler}
            disabled={btnDisable}
          >
            {submitBtnLabel}
          </button>
        </FlexBox>
      </form>
    );
  }
);
