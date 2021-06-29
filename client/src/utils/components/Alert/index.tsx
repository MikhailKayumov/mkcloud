import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { AlertProps } from './types';

import classes from './styles.module.scss';

const transitionClasses = {
  enterActive: classes.alertEnterActive,
  exitActive: classes.alertExitActive
};

export const Alert: React.FC<AlertProps> = React.memo(
  ({ type, title, show, leaveIn = 0, children }): JSX.Element => {
    const [visible, setVisible] = useState(false);

    const className = `${classes.root} ${
      type === 'error' ? classes.root__error : ''
    }`;

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | null = null;

      if (leaveIn > 0) {
        timer = setTimeout(() => setVisible(false), leaveIn);
      }

      return () => {
        timer && clearTimeout(timer);
      };
    }, [leaveIn]);
    useEffect(() => setVisible(show), [show]);

    return (
      <CSSTransition
        in={visible}
        timeout={450}
        classNames={transitionClasses}
        mountOnEnter
        unmountOnExit
      >
        <div className={className}>
          <div className={classes.root__title}>
            {title || 'Неизвестная ошибка'}
            <button
              className={classes.root__titleClose}
              onClick={() => setVisible(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          {children && <div className={classes.root__body}>{children}</div>}
        </div>
      </CSSTransition>
    );
  }
);
