import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileSelectors, fileThunks } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { FileList } from './FileList';

import './styles.scss';

export const Disk: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);

  useEffect(() => {
    dispatch(fileThunks.getFiles(currentDir));
  }, [currentDir, dispatch]);

  return (
    <div className="disk">
      <FlexBox alignItems="center" className="disk__btns">
        <button className="disk__btn disk__btnBack">Назад</button>
        <button className="disk__btn disk__btnCreate">Создать папку</button>
      </FlexBox>
      <FileList />
    </div>
  );
};
