import React, { useEffect, useState } from 'react';

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
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    dispatch(fileThunks.getFiles(currentDir));
  }, [currentDir, dispatch]);

  const createDir = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(true));
  };

  const bakcDir = () => {
    dispatch(fileActions.popFromStack());
  };

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file: File) => {
      dispatch(fileThunks.uploadFile({ file, parent: currentDir }));
    });
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files || []);
    files.forEach((file: File) => {
      dispatch(fileThunks.uploadFile({ file, parent: currentDir }));
    });

    setDragEnter(false);
  };

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
    >
      <FlexBox alignItems="center" className="disk__btns">
        <button className="button disk__btn disk__btnBack" onClick={bakcDir}>
          Назад
        </button>
        <button
          className="button disk__btn disk__btnCreate"
          onClick={createDir}
        >
          Создать папку
        </button>
        <div className="disk__upload">
          <label
            htmlFor="diskUploadInput"
            className="button disk__upload-label"
          >
            Загрузить файл
          </label>
          <input
            type="file"
            className="disk__upload-input"
            id="diskUploadInput"
            onChange={fileUpload}
            multiple={true}
          />
        </div>
      </FlexBox>
      <FileList />
      {popupShow ? <CreateDirPopup /> : null}
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      Перетащите файлы сюда
    </div>
  );
};
