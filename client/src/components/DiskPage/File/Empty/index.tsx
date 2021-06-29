import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { FlexBox } from 'utils/components/FlexBox';

export const Empty: React.FC<{ show: boolean }> = React.memo(
  ({ show }): JSX.Element => {
    return (
      <CSSTransition
        in={show}
        classNames="loader"
        timeout={500}
        appear={false}
        mountOnEnter
        unmountOnExit
      >
        <FlexBox alignItems="center" justify="center" className="no-files">
          Файлов нет
        </FlexBox>
      </CSSTransition>
    );
  }
);
