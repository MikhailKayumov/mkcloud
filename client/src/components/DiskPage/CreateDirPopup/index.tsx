import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { Input } from 'utils/components/Input';
import { FlexBox } from 'utils/components/FlexBox';

export const CreateDirPopup: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);
  const [dirName, setDirName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const popupWrapperRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirName(e.target.value);
  };

  const createDir = () => {
    const name = dirName.trim();

    if (name) {
      dispatch(
        fileThunks.createDir({
          name,
          parent: currentDir
        })
      ).then(() => {
        setDirName('');
        close();
      });
    }
  };

  const close = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(false));
  };

  const closeOnWrapper = (e: React.MouseEvent) => {
    if ((e.target as Node).contains(popupWrapperRef.current)) close();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div ref={popupWrapperRef} className="popup" onClick={closeOnWrapper}>
      <FlexBox direction="column" className="popup__content">
        <FlexBox
          alignItems="center"
          justify="space-between"
          className="popup__header"
        >
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close" onClick={close}>
            &times;
          </button>
        </FlexBox>
        <FlexBox direction="column">
          <Input
            ref={inputRef}
            placeholder="Введите название папки"
            value={dirName}
            onChange={onChange}
          />
          <button className="button popup__create" onClick={createDir}>
            Создать
          </button>
        </FlexBox>
      </FlexBox>
    </div>
  );
};
