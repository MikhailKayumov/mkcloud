import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { Input } from 'utils/components/Input';
import { FlexBox } from 'utils/components/FlexBox';
import { CSSTransition } from 'react-transition-group';

export const CreateDirPopup: React.FC<{
  show: boolean;
}> = ({ show }): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);

  const [dirName, setDirName] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const popupWrapperRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirName(e.target.value);
  };
  const close = useCallback(() => {
    dispatch(fileActions.stopCreatingDir());
  }, [dispatch]);
  const createDir = useCallback(() => {
    const name = dirName.trim();
    if (name) {
      dispatch(fileThunks.createDir({ name, parent: currentDir })).then(() => {
        setDirName('');
        close();
      });
    }
  }, [close, currentDir, dirName, dispatch]);
  const closeOnWrapper = (e: React.MouseEvent) => {
    if ((e.target as Node).contains(popupWrapperRef.current)) close();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') createDir();
    };

    if (show) {
      inputRef.current?.focus();
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [createDir, show]);

  return (
    <CSSTransition
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames="popup-wrap"
      in={show}
    >
      <div ref={popupWrapperRef} className="popup" onClick={closeOnWrapper}>
        <FlexBox direction="column" className="popup__content">
          <FlexBox
            alignItems="center"
            justify="space-between"
            className="popup__header"
          >
            <div className="popup__title">?????????????? ?????????? ??????????</div>
            <button className="popup__close" onClick={close}>
              &times;
            </button>
          </FlexBox>
          <FlexBox direction="column">
            <Input
              ref={inputRef}
              placeholder="?????????????? ???????????????? ??????????"
              value={dirName}
              onChange={onChange}
            />
            <button className="button popup__create" onClick={createDir}>
              ??????????????
            </button>
          </FlexBox>
        </FlexBox>
      </div>
    </CSSTransition>
  );
};
