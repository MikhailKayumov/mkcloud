import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { FileList } from './FileList';
import { CreateDirPopup } from './CreateDirPopup';

import './styles.scss';

export const Disk: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);
  const popupShow = useSelector(fileSelectors.popupShow);

  useEffect(() => {
    dispatch(fileThunks.getFiles(currentDir));
  }, [currentDir, dispatch]);

  const createDir = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(true));
  };

  const bakcDir = () => {
    dispatch(fileActions.popFromStack());
  };

  return (
    <div className="disk">
      <FlexBox alignItems="center" className="disk__btns">
        <button className="disk__btn disk__btnBack" onClick={bakcDir}>
          Назад
        </button>
        <button className="disk__btn disk__btnCreate" onClick={createDir}>
          Создать папку
        </button>
      </FlexBox>
      <FileList />
      {popupShow ? <CreateDirPopup /> : null}
    </div>
  );
};
