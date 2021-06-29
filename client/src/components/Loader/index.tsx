import React from 'react';
import { FlexBox } from 'utils/components/FlexBox';
import { CSSTransition } from 'react-transition-group';

export const Loader: React.FC<{ show: boolean }> = React.memo(({ show }) => (
  <CSSTransition
    in={show}
    classNames="loader"
    timeout={500}
    appear
    mountOnEnter
    unmountOnExit
  >
    <FlexBox justify="center" alignItems="center" className="content-loader">
      <div className="content-loader__content">
        <div />
        <div />
        <div />
        <div />
      </div>
    </FlexBox>
  </CSSTransition>
));
