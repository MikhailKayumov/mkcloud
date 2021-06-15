import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { Input } from 'utils/components/Input';
import { FlexBox } from 'utils/components/FlexBox';

export const CreateDirPopup: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);
  const [dirName, setDirName] = useState('');

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
      });
    }
  };

  const close = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(false));
  };

  return (
    <FlexBox justify="center" alignItems="center" className="popup">
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
            placeholder="Введите название папки"
            value={dirName}
            onChange={onChange}
          />
          <button className="popup__create" onClick={createDir}>
            Создать
          </button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};